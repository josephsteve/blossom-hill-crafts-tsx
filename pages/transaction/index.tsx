import Page from '@/components/layout/Page';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getTransactions } from '@/utils/Fauna';
import TransactionsDataTable from '@/components/TransactionsDataTable';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const transactions = await getTransactions();
    return {
      props: { transactions }
    }
  } catch (error) {
    console.error(error);
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/`);
    return { props: {} };
  }
}

export default function Transaction ({transactions}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page>
      <h3>Transactions</h3>
      <TransactionsDataTable transactions={transactions}/>
    </Page>
  );
}
