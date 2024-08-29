export const MockAPI = {
  list: (params) =>
    new Promise((resolve) => {
      uni.showLoading({ title: '加载中' })
      console.log('pageParams', params)
      setTimeout(() => {
        const data = [
          {
            id: '1',
            no: '22ssfasf',
            storage: 'xxxx',
            date: '2024-02-02'
          },
          {
            id: '2',
            no: '22ssfasf',
            storage: 'xxxx',
            date: '2024-02-02'
          },
          {
            id: '3',
            no: '22ssfasf',
            storage: 'xxxx',
            date: '2024-02-02'
          },
          {
            id: '4',
            no: '22ssfasf',
            storage: 'xxxx',
            date: '2024-02-02'
          }
        ]
        resolve({ data, dataCount: 100, pageCount: 10 })
      }, 500)
    })
}
