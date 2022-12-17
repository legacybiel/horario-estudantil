import { CategoriaTurmaType } from '../modules/categoria-turma/schemas/CategoriaTurma.type';
import { PeriodoLetivoType } from '../modules/periodo-letivo/schemas/periodo-letivo.type';
import { InstituicaoMembershipType } from '../modules/instituicao-membership/schemas/instituicao-membership.type';
import {
  CategoriaTurma,
  Instituicao,
  InstituicaoMembership,
  PeriodoLetivo,
} from '@horario-estudantil/schemas';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Instituicao')
export class InstituicaoType implements Instituicao {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  nome!: string;

  @Field(() => String)
  sigla!: string;

  @Field(() => String)
  apelido!: string;

  @Field(() => Date, { nullable: true })
  lastUpdate!: Date | null;

  // @Field(() => Date, { nullable: true })
  lastSearchSync!: Date | null;

  @Field(() => [CategoriaTurmaType])
  categoriasTurma!: CategoriaTurma[];

  @Field(() => [InstituicaoMembershipType])
  memberships!: InstituicaoMembership[];

  @Field(() => [PeriodoLetivoType])
  periodosLetivos!: PeriodoLetivo[];
}
