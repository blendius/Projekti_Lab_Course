import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
interface Props {
  inverted?: boolean;
  content?: String;
}
export default function LoadingComponent({
  inverted = false,
  content = "Loading..",
}: Props) {
  return (
    <Dimmer active={false} inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
}
