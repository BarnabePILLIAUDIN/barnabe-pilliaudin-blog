const handleExpiredSession = async (requestFn, router) => {
  try {
    const result = await requestFn()

    if (result?.meta?.loginAgain) {
      router.push("/ExpiredSession")
    }

    return result
  } catch (err) {
    if (err?.response?.data?.meta?.loginAgain) {
      router.push("/ExpiredSession")
    }

    return err.response.data
  }
}

export default handleExpiredSession
