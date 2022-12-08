import Head from 'next/head';
import { IAppPage } from '../../etc/app/pages/IAppPage';
import { buildPageTitle } from '../../etc/app/skeleton/buildPageTitle';
import PainelLayoutMain from '../PainelLayoutMain/PainelLayoutMain';

const PainelPageInstituicao: IAppPage = () => {
  return (
    <>
      <Head>
        <title>
          {buildPageTitle(['Instituição', 'Painel de Administração'])}
        </title>
      </Head>

      <PainelLayoutMain>TBI.</PainelLayoutMain>
    </>
  );
};

PainelPageInstituicao.auth = true;

export default PainelPageInstituicao;
