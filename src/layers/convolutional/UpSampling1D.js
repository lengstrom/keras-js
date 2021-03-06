import Layer from '../../Layer'
import Tensor from '../../Tensor'
import ops from 'ndarray-ops'

/**
 * UpSampling1D layer class
 */
export default class UpSampling1D extends Layer {
  /**
   * Creates a UpSampling1D activation layer
   * @param {number} attrs.length - upsampling factor
   */
  constructor (attrs = {}) {
    super(attrs)
    this.layerClass = 'UpSampling1D'

    const {
      length = 2
    } = attrs
    this.length = length
  }

  /**
   * Method for layer computational logic
   * @param {Tensor} x
   * @returns {Tensor} x
   */
  call (x) {
    const inputShape = x.tensor.shape
    const outputShape = [inputShape[0] * this.length, inputShape[1]]
    let y = new Tensor([], outputShape)
    for (let i = 0; i < this.length; i++) {
      ops.assign(
        y.tensor.lo(i, 0).step(this.length, 1),
        x.tensor
      )
    }
    x.tensor = y.tensor
    return x
  }
}
