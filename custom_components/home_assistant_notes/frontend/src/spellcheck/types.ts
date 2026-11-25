export interface LanguageConfig {
  /** Dictionary code, e.g. `nb`. */
  code: string;
  /** Code understood by tinyld, e.g. `no` for `nb`. */
  tinyld: string;
  /** Contents of the Hunspell .aff file. */
  aff: string;
  /** Contents of the Hunspell .dic file. */
  dic: string;
}

export interface BlockRequest {
  key: string;
  text: string;
  /** Manual per-block language; ignored unless it is in the loaded pair. */
  langOverride?: string;
  /** Language to use when the block is uncertain and has no previous block. */
  inheritLang?: string;
}

/** Offsets are UTF-16 code units into the block text. */
export interface Misspelling {
  offset: number;
  length: number;
  word: string;
}

export interface BlockResult {
  key: string;
  lang: string;
  misspelled: Misspelling[];
}

export interface Token {
  offset: number;
  length: number;
  word: string;
}
