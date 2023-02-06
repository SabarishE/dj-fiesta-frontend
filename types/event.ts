export interface EventDataInterface {
  id: number;
  attributes: EventInterface;
}

export interface EventInterface {
  name: string;
  slug: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  performers: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: ImageInterface;
}

export interface ImageInterface {
  data: Daum;
}

export interface Daum {
  id: number;
  attributes: Attributes;
}

export interface Attributes {
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: ProviderMetadata5;
  createdAt: string;
  updatedAt: string;
}

export interface Formats {
  thumbnail: Thumbnail;
  small: Small;
  medium: Medium;
  large: Large;
}

export interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  url: string;
  provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  url: string;
  provider_metadata: ProviderMetadata2;
}

export interface ProviderMetadata2 {
  public_id: string;
  resource_type: string;
}

export interface Medium {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  url: string;
  provider_metadata: ProviderMetadata3;
}

export interface ProviderMetadata3 {
  public_id: string;
  resource_type: string;
}

export interface Large {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: any;
  width: number;
  height: number;
  size: number;
  url: string;
  provider_metadata: ProviderMetadata4;
}

export interface ProviderMetadata4 {
  public_id: string;
  resource_type: string;
}

export interface ProviderMetadata5 {
  public_id: string;
  resource_type: string;
}
