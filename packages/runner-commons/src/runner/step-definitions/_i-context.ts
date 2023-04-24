/* eslint-disable  @typescript-eslint/no-explicit-any */
type focusedElement = any;
export interface IContext {
  focusedElement ?: focusedElement;
  timeout : number | null;
}
