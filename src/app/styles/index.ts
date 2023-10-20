import { extendTheme } from "@chakra-ui/react";
import { Container } from "./components/Container";
import { Button } from "./components/Button";
import { Link } from "./components/Link";
import { Input } from "./components/Input";
import { Tooltip } from "./components/Tooltip";
import { Modal } from "./components/Modal";
import { Textarea } from "./components/Textarea";
import { Select } from "./components/Select";
import { fontSizes } from "./foundations/fontSizes";
import { fonts } from "./foundations/fonts";
import { colors } from "./foundations/colors";
import { styles } from "./styles";

const config = {
  initialColorMode: "Dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Container,
    Button,
    Link,
    Input,
    Textarea,
    Select,
    Tooltip,
    Modal,
  },
  fontSizes,
  colors,
  styles,
  fonts,
  shadows: {
    outline: "none",
  },
});

export default theme;
