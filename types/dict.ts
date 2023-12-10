export type IDictData = Array<{
    word: string;
    prs: { label: string | null; audio_url: string | null } | null;
    fl: string;
    shortdef: string;
  }>;