import Db from './db'
import PasPubSub from './pub-sub'

const Init = async () => {
  const result = await Db.getDueInvoices()

  PasPubSub.publishBatchedMessages(result)
}
Init()