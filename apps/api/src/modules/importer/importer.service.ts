import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { PrismaService } from "../../prisma/prisma.service";
import { BulkImportDto } from "./dto/bulk-import.dto";

@Injectable()
export class ImporterService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue("tool-imports") private readonly queue: Queue
  ) {}

  async createJob(dto: BulkImportDto) {
    const job = await this.prisma.importJob.create({
      data: {
        source: dto.source,
        format: dto.format,
        status: "queued",
        metadata: {
          sourceUrl: dto.sourceUrl,
          mapping: dto.mapping,
          csvPreview: dto.csvText?.slice(0, 500)
        }
      }
    });
    await this.queue.add("bulk-import", { importJobId: job.id, dto }, { attempts: 3, backoff: { type: "exponential", delay: 5000 } });
    return job;
  }

  listJobs() {
    return this.prisma.importJob.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  }

  async detectDuplicates(toolId: string) {
    const tool = await this.prisma.tool.findUnique({ where: { id: toolId } });
    if (!tool) return [];
    const candidates = await this.prisma.tool.findMany({
      where: {
        id: { not: toolId },
        OR: [
          { name: { contains: tool.name, mode: "insensitive" } },
          { websiteUrl: tool.websiteUrl },
          { slug: { contains: tool.slug, mode: "insensitive" } }
        ]
      },
      take: 20
    });
    return Promise.all(
      candidates.map((candidate) =>
        this.prisma.duplicateCandidate.upsert({
          where: { sourceToolId_targetToolId: { sourceToolId: tool.id, targetToolId: candidate.id } },
          update: { score: candidate.websiteUrl === tool.websiteUrl ? 0.98 : 0.72 },
          create: {
            sourceToolId: tool.id,
            targetToolId: candidate.id,
            score: candidate.websiteUrl === tool.websiteUrl ? 0.98 : 0.72,
            reasons: [candidate.websiteUrl === tool.websiteUrl ? "same_domain" : "similar_name"]
          }
        })
      )
    );
  }
}

