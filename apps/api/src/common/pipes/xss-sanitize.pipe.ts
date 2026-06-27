import { Injectable, PipeTransform } from "@nestjs/common";
import sanitizeHtml from "sanitize-html";

@Injectable()
export class XssSanitizePipe implements PipeTransform {
  transform(value: unknown) {
    return sanitize(value);
  }
}

function sanitize(value: unknown): unknown {
  if (typeof value === "string") {
    return sanitizeHtml(value, {
      allowedTags: [],
      allowedAttributes: {}
    }).trim();
  }

  if (Array.isArray(value)) return value.map((item) => sanitize(item));

  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, sanitize(item)]));
  }

  return value;
}

