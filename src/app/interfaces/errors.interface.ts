export interface ErrorBase {
  code: number;
  desc: string;
  detail: any;
  trace_id: string;
}

