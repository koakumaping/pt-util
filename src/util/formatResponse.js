/**
* 重新格式化返回的数据
*
* 用于重新格式化返回的数据
*
* @returns {Array}
*
* @date 2017-09-15
* @author Ping YF (koakumaping@163.com)
*/
import clone from './clone'
import hasOwn from './hasOwn'
import isNumber from './isNumber'
import formatePermission from './formatePermission'

const formatResponse = (list = []) => {
  const _list = []
  for (let i = 0, l = list.length; i < l; ++i) {
    // 创建新的一行
    const _line = {
      // 是否处于编辑状态，默认否
      edit: false,
      // 保存一份原始数据，用于还原
      _origin: clone(list[i]),
    }

    _line.p = formatePermission(_line)

    for (const item in list[i]) {
      if (hasOwn(list[i][item], 'value')) {
        _line[item] = isNumber(list[i][item].value) ?
          Number(list[i][item].value) : list[i][item].value
      } else if (hasOwn(list[i][item], 'rows')) {
        list[i][item].rows = formatResponse(list[i][item].rows)
        _line[item] = list[i][item]
      } else {
        _line[item] = list[i][item]
      }
    }
    _list.push(_line)
  }
  return _list
}

export default formatResponse