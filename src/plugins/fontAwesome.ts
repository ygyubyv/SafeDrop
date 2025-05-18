import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faRightToBracket,
  faArrowLeft,
  faArrowRight,
  faEnvelope,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { faGoogle, faMicrosoft, faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(
  faRightToBracket,
  faArrowRight,
  faArrowLeft,
  faGoogle,
  faMicrosoft,
  faGithub,
  faEnvelope,
  faPlus
);

export { FontAwesomeIcon };
