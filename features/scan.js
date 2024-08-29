const handleKeyPress = ({ e, onSuccess }) => {
  // #ifdef APP-PLUS
  if (e.keyCode == 66 || e.keyCode === 102 || e.keyCode === 103 || e.keyCode === 104) {
    setTimeout(() => onSuccess?.(), 500)
  }
  // #endif
  // #ifdef H5
  if (e.key == 'Enter') {
    onSuccess?.()
  }
  // #endif
}

export const handleScan = (onSuccess) => {
  // #ifdef APP-PLUS
  plus.key.addEventListener('keyup', (e) => handleKeyPress({ e, onSuccess }))
  // #endif
  // #ifdef H5
  document.addEventListener('keyup', (e) => handleKeyPress({ e, onSuccess }))
  // #endif
}

export const handleRemoveScan = (onSuccess) => {
  // #ifdef APP-PLUS
  plus.key.removeEventListener('keyup', (e) => handleKeyPress({ e, onSuccess }))
  // #endif
  // #ifdef H5
  document.removeEventListener('keyup', (e) => handleKeyPress({ e, onSuccess }))
  // #endif
}
