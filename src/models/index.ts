import User from "@models/user-model";
import CurrencyTransaction from "@models/currency-transaction-model";

const sync = async () => {
    await User.sync({force: false});
    await CurrencyTransaction.sync({force: false});
}

export default {
    sync
}