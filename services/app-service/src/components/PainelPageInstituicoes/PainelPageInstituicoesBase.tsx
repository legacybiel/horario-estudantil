import Head from 'next/head';
import { buildPageTitle } from '../../etc/skeleton/buildPageTitle';
import PainelLayoutMain from '../PainelLayoutMain/PainelLayoutMain';
import { PAINEL_PAGE_INSTITUICOES_BREADCRUMB_ITEMS } from './PAINEL_PAGE_INSTITUICOES_BREADCRUMB_ITEMS';
import PainelPageInstituicoesHeader from './PainelPageInstituicoesHeader';

import PainelLayoutBaseContainer from '../PainelLayoutBaseContainer/PainelLayoutBaseContainer';
import dynamic from 'next/dynamic';
import UILoading from '../UILoading/UILoading';

const PainelPageInstituicoesResultsTable = dynamic(
  () => import('./PainelPageInstituicoesResultsTable'),
  { loading: () => <UILoading color={'secondary'} /> },
);

const PainelPageInstituicoesBase = () => {
  return (
    <>
      <Head>
        <title>
          {buildPageTitle(['Instituições', 'Painel de Administração'])}
        </title>
      </Head>

      <PainelLayoutMain
        breadcrumbItems={PAINEL_PAGE_INSTITUICOES_BREADCRUMB_ITEMS}
      >
        <PainelLayoutBaseContainer>
          <PainelPageInstituicoesHeader />

          <PainelPageInstituicoesResultsTable />
        </PainelLayoutBaseContainer>
      </PainelLayoutMain>
    </>
  );
};

export default PainelPageInstituicoesBase;
