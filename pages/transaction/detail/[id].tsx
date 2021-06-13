import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getTransactionById, getTransactionDetailsByTransId } from '@/utils/Fauna';
import Page from '@/components/layout/Page';
import TransactionHeaderTable from '@/components/TransactionHeaderTable';
import TransactionDetailTable from '@/components/TransactionDetailTable';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // @ts-ignore
    const id = context.params.id;
    console.log(id);
    const transaction = await getTransactionById(typeof id === 'string' ? id : '');
    const transaction_details = await getTransactionDetailsByTransId(typeof id === 'string' ? id : '');
    return {
      props: { transaction, transaction_details }
    };
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/`);
    return { props: {} };
  }
}

export default function Home ({transaction, transaction_details}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page>
      <h3>Transaction</h3>
      <TransactionHeaderTable transaction={transaction} />
      <TransactionDetailTable transaction_details={transaction_details} />
    </Page>
  );
}
