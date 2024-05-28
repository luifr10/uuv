/**
 * Software Name : UUV
 *
 * SPDX-FileCopyrightText: Copyright (c) Orange SA
 * SPDX-License-Identifier: MIT
 *
 * This software is distributed under the MIT License,
 * see the "LICENSE" file for more details
 *
 * Authors: NJAKO MOLOM Louis Fredice & SERVICAL Stanley
 * Software description: Make test writing fast, understandable by any human
 * understanding English or French.
 */

import { FocusableElement } from "tabbable";
import { AdditionalLayerEnum, UUV_ASSISTANT_BAR_WIDTH } from "../Commons";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
export class KeyboardNavigationHelper {
  static HIGHLIGHTER_PROPS = {
    width: 4,
    borderColor: "orange"
  };

  static NAVIGATION_ORDER_PROPS = {
    radius: 12,
    linkWith: 4
  };

  static styles = `
    #keyboard-layer-current-navigation-svg, #keyboard-layer-expected-navigation-svg {
      z-index: 9000;
      position: absolute;
      top: 0;
      min-width: calc(100vw - ${UUV_ASSISTANT_BAR_WIDTH}px);
      width: ${document.body.getBoundingClientRect().width - UUV_ASSISTANT_BAR_WIDTH}px;
      min-height: 100vh;
      height: ${document.body.getBoundingClientRect().height + 50}px;
      background-color: rgba(128, 128, 128, 0.65);
    }
    
    .element-border {
      fill: transparent;
    }
    
    .navigation-order {
      fill: black;
      cursor: pointer;
    }
    
    .navigation-order-content {
      fill: white;
      cursor: pointer;
    }
    
    .navigation-line {
      stroke: black;
      stroke-width: ${this.NAVIGATION_ORDER_PROPS.linkWith};
    }
  `;

  public static buildKeyboardSvg(keyboardLayer: ShadowRoot, layer: AdditionalLayerEnum, currentKeyboardNavigation: FocusableElement[]) {
    this.initKeyboardSvg(keyboardLayer, layer, currentKeyboardNavigation);
    const keyboardLayerContainer = keyboardLayer.querySelector(`#${layer.toString()}-svg`);
    if (keyboardLayerContainer) {
      currentKeyboardNavigation.forEach((currentElement, index, allElements) => {
        if (index > 0 ) {
          this.drawLinkBetweenElement(keyboardLayerContainer, allElements[index - 1], currentElement);
        }
      });
      currentKeyboardNavigation.forEach((currentElement, index, allElements) => {
        this.drawHighlight(keyboardLayerContainer, currentElement, index);
        this.drawNavigationOrder(keyboardLayerContainer, currentElement, index);
      });
    }
  }

  public static addLayerToShadowDom(dom: ShadowRoot, layer: AdditionalLayerEnum) {
    const currentKeyboardLayer = document.createElement("div");
    currentKeyboardLayer.setAttribute("id", layer.toString());
    dom.appendChild(currentKeyboardLayer);
  }

  public static removeLayerToShadowDom(dom: ShadowRoot, layer: AdditionalLayerEnum) {
    const currentKeyboardLayer = dom.getElementById(layer.toString());
    if (currentKeyboardLayer) {
      dom.removeChild(currentKeyboardLayer);
    }
  }

  public static switchKeyboardLayer(keyboardLayer: ShadowRoot, layer: AdditionalLayerEnum, elements: FocusableElement[]) {
    if (layer === AdditionalLayerEnum.CURRENT_NAVIGATION) {
      this.removeLayerToShadowDom(keyboardLayer, AdditionalLayerEnum.EXPECTED_NAVIGATION);
      this.addLayerToShadowDom(keyboardLayer, AdditionalLayerEnum.CURRENT_NAVIGATION);
      this.buildKeyboardSvg(keyboardLayer, AdditionalLayerEnum.CURRENT_NAVIGATION, elements);
    } else {
      this.removeLayerToShadowDom(keyboardLayer, AdditionalLayerEnum.CURRENT_NAVIGATION);
      this.addLayerToShadowDom(keyboardLayer, AdditionalLayerEnum.EXPECTED_NAVIGATION);
      this.buildKeyboardSvg(keyboardLayer, AdditionalLayerEnum.EXPECTED_NAVIGATION, elements);
    }
  }

  private static initKeyboardSvg(keyboardLayer: ShadowRoot, layer: AdditionalLayerEnum, currentKeyboardNavigation?: FocusableElement[]) {
    const completeStyle = this.buildCompleteStyle(currentKeyboardNavigation);
    const element = keyboardLayer.querySelector(`#${layer.toString()}`);
    if (element) {
      element.innerHTML = `
      <style>
        ${completeStyle}
      </style>
      <svg xmlns="http://www.w3.org/2000/svg" id="${layer.toString()}-svg">
      </svg>
    `;
    }
  }

  private static buildCompleteStyle(currentKeyboardNavigation?: FocusableElement[]) {
    let completeStyle = `${this.styles}`;
    if (currentKeyboardNavigation) {
      currentKeyboardNavigation.forEach((element, index) => {
        completeStyle = `${completeStyle}
                
        #element-border-${index}:has(~ #navigation-order-${index}:hover), #element-border-${index}:has(~ #navigation-order-content-${index}:hover) {
          stroke-width: ${this.HIGHLIGHTER_PROPS.width};
          stroke: ${this.HIGHLIGHTER_PROPS.borderColor};
          fill: transparent;
        }
        
        .navigation-line:has(~ #navigation-order-${index}:hover), .navigation-line:has(~ #navigation-order-content-${index}:hover) {
          stroke: grey;
        }
        `;
      });
    }
    return completeStyle;
  }

  private static drawHighlight(keyboardLayerContainer: Element, targetElement: FocusableElement, order: number) {
    const highlightArea = document.createElementNS(SVG_NAMESPACE, "rect");
    highlightArea.setAttribute("class", "element-border");
    highlightArea.setAttribute("id", `element-border-${order}`);
    highlightArea.setAttribute("width", `${targetElement.getBoundingClientRect().width + (this.HIGHLIGHTER_PROPS.width * 2)}`);
    highlightArea.setAttribute("height", `${targetElement.getBoundingClientRect().height + (this.HIGHLIGHTER_PROPS.width * 2)}`);
    highlightArea.setAttribute("x", `${window.scrollX + targetElement.getBoundingClientRect().x - this.HIGHLIGHTER_PROPS.width}`);
    highlightArea.setAttribute("y", `${window.scrollY + targetElement.getBoundingClientRect().y - this.HIGHLIGHTER_PROPS.width}`);
    keyboardLayerContainer.append(highlightArea);
  }

  private static drawNavigationOrder(keyboardLayerContainer: Element, targetElement: FocusableElement, order: number) {
    const x = window.scrollX + targetElement.getBoundingClientRect().x + targetElement.getBoundingClientRect().width;
    const y = window.scrollY + targetElement.getBoundingClientRect().y;

    const orderIndicatorContainer = document.createElementNS(SVG_NAMESPACE, "circle");
    orderIndicatorContainer.setAttribute("class", "navigation-order");
    orderIndicatorContainer.setAttribute("id", `navigation-order-${order}`);
    orderIndicatorContainer.setAttribute("r", `${this.NAVIGATION_ORDER_PROPS.radius}`);
    orderIndicatorContainer.setAttribute("cx", `${x}`);
    orderIndicatorContainer.setAttribute("cy", `${y}`);

    const orderIndicatorContent = document.createElementNS(SVG_NAMESPACE, "text");
    orderIndicatorContent.innerHTML = `${order + 1}`;
    orderIndicatorContent.setAttribute("class", "navigation-order-content");
    orderIndicatorContent.setAttribute("id", `navigation-order-content-${order}`);
    orderIndicatorContent.setAttribute("text-anchor", "middle");
    orderIndicatorContent.setAttribute("alignment-baseline", "central");
    orderIndicatorContent.setAttribute("x", `${x}`);
    orderIndicatorContent.setAttribute("y", `${y}`);

    keyboardLayerContainer.append(orderIndicatorContainer);
    keyboardLayerContainer.append(orderIndicatorContent);
  }

  private static drawLinkBetweenElement(keyboardLayerContainer: Element, previousElement: FocusableElement, currentElement: FocusableElement) {
    const startPoint = this.getMiddlePoint(previousElement);
    const endPoint = this.getMiddlePoint(currentElement);
    const linkBetweenNode = document.createElementNS(SVG_NAMESPACE, "line");
    linkBetweenNode.setAttribute("class", "navigation-line");
    linkBetweenNode.setAttribute("x1", `${startPoint.x}`);
    linkBetweenNode.setAttribute("y1", `${startPoint.y}`);
    linkBetweenNode.setAttribute("x2", `${endPoint.x}`);
    linkBetweenNode.setAttribute("y2", `${endPoint.y}`);

    keyboardLayerContainer.append(linkBetweenNode);
  }

  private static getMiddlePoint(previousElement) {
    return {
      x: window.scrollX + previousElement.getBoundingClientRect().x + previousElement.getBoundingClientRect().width,
      y: window.scrollY + previousElement.getBoundingClientRect().y
    };
  }
}
