import H1 from "./H1";
import H2 from "./H2";
import P from "./P";
import A from "./A";
import H3 from "./H3";
import H4 from "./H4";
import Lead from "./Lead";
import HeroTitle from "./HeroTitle";
import HeroSubtitle from "./HeroSubtitle";
import UL from "./UL";
import LI from "./LI";
import HR from "./HR";
import BlockQuote from "./BlockQuote";

const MdxComponentMap = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  a: A,
  ul: UL,
  li: LI,
  blockquote: BlockQuote,
  hr: HR
};

export {
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  MdxComponentMap,
  HeroTitle,
  HeroSubtitle,
  A,
  UL,
  LI,
  BlockQuote
};
