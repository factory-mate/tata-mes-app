import { ref } from 'vue'

export function usePageParams() {
  const pageParams = ref({
    pageIndex: 1,
    pageSize: 10
  })

  const pageInfo = ref({
    dataCount: 0,
    pageCount: 0,
    status: 'loadmore'
  })

  const setPageParams = (params) => {
    pageParams.value = { ...pageParams.value, ...params }
  }

  const setPageInfo = (info) => {
    pageInfo.value = { ...pageInfo.value, ...info }
  }

  const setPageStatus = (status) => {
    pageInfo.value.status = status
  }

  const clearPageParams = () => {
    pageParams.value = {
      pageIndex: 1,
      pageSize: 10
    }
  }

  const clearPageInfo = () => {
    pageInfo.value = {
      dataCount: 0,
      pageCount: 0,
      status: 'loadmore'
    }
  }

  const handleScrollToLower = (cb) => {
    setPageStatus('loading')
    pageParams.value.pageIndex += 1
    if (pageParams.value.pageIndex >= pageInfo.value.pageCount) {
      setPageStatus('nomore')
    } else {
      cb?.()
    }
  }

  return {
    pageParams,
    pageInfo,
    setPageParams,
    setPageInfo,
    setPageStatus,
    clearPageParams,
    clearPageInfo,
    handleScrollToLower
  }
}
