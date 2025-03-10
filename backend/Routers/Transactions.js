import express from 'express';
import { addTransactionController, deleteTransactionController, getAllTransactionController, updateTransactionController, getTransactionsController } from '../controllers/transactionController.js';

const router = express.Router();

router.route("/addTransaction").post(addTransactionController);

router.route("/getTransactions/:userId").get(getTransactionsController);

router.route("/getTransactioncustom").post(getAllTransactionController);

router.route("/deleteTransaction/:id").delete(deleteTransactionController);

router.route('/updateTransaction/:id').put(updateTransactionController);

export default router;