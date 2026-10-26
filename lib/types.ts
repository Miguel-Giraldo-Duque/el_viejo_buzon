export type Review = {
  text: string;
  signature: string;
  source_label: string;
  url: string;
  date?: string | null;
  initial?: string | null;
};

export type MenuPhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type MenuCategory = {
  name: string;
  items: string[];
};

export type HourRow = {
  label: string;
  value: string;
};

export type Site = {
  meta: {
    slug: string;
    name: string;
    lang: string;
    title: string;
    description: string;
    robots: string;
  };
  contact: {
    phone_display: string;
    phone_tel: string;
    email: string;
    instagram: string;
    instagram_url: string;
  };
  address: {
    line: string;
    neighborhood_note: string;
    maps_url: string;
    maps_label: string;
    photo: string;
    photo_alt: string;
    photo_width: number;
    photo_height: number;
  };
  footer: {
    lines: string[];
    credit: string;
  };
  sections: {
    hero: {
      enabled: boolean;
      lede: string;
      story: string;
      quote: string;
      quote_source: string;
      postmark: string;
      call_label: string;
      image: string;
      image_alt: string;
      image_width: number;
      image_height: number;
      object_position: string;
    };
    reviews: {
      enabled: boolean;
      title: string;
      items: Review[];
    };
    menu: {
      enabled: boolean;
      title: string;
      price_note: string;
      dessert_note: string;
      photos: MenuPhoto[];
      categories: MenuCategory[];
    };
    about: {
      enabled: boolean;
      title: string;
      paragraphs: string[];
    };
    events: {
      enabled: boolean;
      title: string;
      paragraphs: string[];
    };
    hours: {
      enabled: boolean;
      title: string;
      rows: HourRow[];
    };
    cta: {
      enabled: boolean;
      title: string;
      text: string;
    };
    whatsapp_bar: {
      enabled: boolean;
      number: string | null;
      label: string;
    };
    mobile_bar: {
      enabled: boolean;
      call_label: string;
    };
  };
};
