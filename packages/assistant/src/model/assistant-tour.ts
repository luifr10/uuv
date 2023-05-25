import { TourProps } from "antd";
import { useRef } from "react";

export class AssistantTour {
  steps: TourProps["steps"];
  refResize: React.MutableRefObject<any> = useRef(null);
  refSelect: React.MutableRefObject<any> = useRef(null);
  refCopy: React.MutableRefObject<any> = useRef(null);
  refAction: React.MutableRefObject<any> = useRef(null);
  refSentence: React.MutableRefObject<any> = useRef(null);
  refSearch: React.MutableRefObject<any> = useRef(null);
}
