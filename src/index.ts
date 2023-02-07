/*
 * @Author: super
 * @Date: 2019-06-27 16:29:31
 * @Last Modified by: suporka
 * @Last Modified time: 2020-03-04 12:24:50
 */

import { toCanvas } from "./toCanvas";
import { toImage, saveImage, convertToFile } from "./toImage";
import { BaseOptions } from "../types/index";
import { version } from '../package.json';
class QrCodeWithLogo {

  static version: string = version

  option: BaseOptions;
  ifCanvasDrawed: boolean = false
  ifImageCreated: boolean = false

  private defaultOption: BaseOptions = {
    canvas: document.createElement("canvas"),
    image: new Image(),
    content: ''
  }

  constructor(option: BaseOptions) {
    this.option = Object.assign(this.defaultOption, option);
    if (!this.option.canvas) this.option.canvas = document.createElement("canvas")
    if (!this.option.image) this.option.image = document.createElement("img")
  }

  public toCanvas(): Promise<void> {
    return toCanvas.call(this, this.option).then(() => {
      this.ifCanvasDrawed = true
      return Promise.resolve()
    })
  };
  public toImage(): Promise<void> {
    return toImage.call(this, this.option);
  }
  public async downloadImage(name: string) {
    if (!this.ifImageCreated) await this.toImage()
    saveImage(this.option.image, name);
  }
  public async getFile(name: string): Promise<File> {
    if (!this.ifImageCreated) await this.toImage()
    return convertToFile(this.option.image, name);
  }
  public async getCanvas(): Promise<HTMLCanvasElement> {
    if (!this.ifCanvasDrawed) await this.toCanvas()
    return this.option.canvas
  }

}

export default QrCodeWithLogo;
