Tecnologias Utilizadas
TypeScript: Linguagem principal do projeto, adicionando tipagem estática ao JavaScript para maior segurança e robustez.
Node.js: Ambiente de execução para JavaScript no lado do servidor.
Express: Framework web para Node.js, utilizado para gerenciar rotas e middlewares.
TypeORM: Object-Relational Mapper (ORM) para TypeScript e JavaScript, facilitando a interação com bancos de dados relacionais.
Jest: Framework de testes em JavaScript, utilizado para garantir a qualidade do código.
ESLint: Ferramenta de linting para identificar e corrigir problemas no código.
Prettier: Formatador de código para manter um estilo consistente.
Estrutura de Pastas e Arquivos
A estrutura do projeto é organizada da seguinte forma:

pgsql
Copiar
Editar
leet-gestao-de-pedidos-api/
├── .vscode/
├── docs/
├── src/
│   ├── modules/
│   │   ├── orders/
│   │   │   ├── dtos/
│   │   │   │   └── CreateOrderDTO.ts
│   │   │   ├── infra/
│   │   │   │   ├── http/
│   │   │   │   │   ├── controllers/
│   │   │   │   │   │   └── OrdersController.ts
│   │   │   │   │   ├── routes/
│   │   │   │   │       └── orders.routes.ts
│   │   │   │   ├── typeorm/
│   │   │   │       ├── entities/
│   │   │   │       │   └── Order.ts
│   │   │   │       ├── repositories/
│   │   │   │           └── OrdersRepository.ts
│   │   │   ├── repositories/
│   │   │   │   └── IOrdersRepository.ts
│   │   │   ├── services/
│   │   │       └── CreateOrderService.ts
│   ├── config/
│   ├── shared/
│   │   ├── container/
│   │   ├── errors/
│   │   ├── infra/
│   │       ├── http/
│   │       └── typeorm/
├── .editorconfig
├── .env.example
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── Procfile
├── insomnia.json
├── jest.config.js
├── ormconfig.js
├── package-lock.json
├── package.json
├── prettier.config.js
├── tsconfig.json
├── yarn.lock
Descrição dos Arquivos do Módulo de Order
dtos/CreateOrderDTO.ts: Define o Data Transfer Object para a criação de um pedido, especificando os dados necessários para essa operação.

infra/http/controllers/OrdersController.ts: Controlador responsável por gerenciar as requisições HTTP relacionadas aos pedidos, como criação, atualização e listagem.

infra/http/routes/orders.routes.ts: Define as rotas HTTP para as operações de pedidos, conectando URLs específicas aos métodos correspondentes no OrdersController.

infra/typeorm/entities/Order.ts: Define a entidade Order para o TypeORM, mapeando a estrutura da tabela de pedidos no banco de dados.

infra/typeorm/repositories/OrdersRepository.ts: Implementa os métodos de acesso ao banco de dados para a entidade Order, como salvar, buscar e deletar pedidos.

repositories/IOrdersRepository.ts: Define a interface para o repositório de pedidos, especificando os métodos que devem ser implementados pelo OrdersRepository.

services/CreateOrderService.ts: Contém a lógica de negócios para a criação de um novo pedido, utilizando o OrdersRepository para interagir com o banco de dados.

Interligação dos Arquivos
Rotas: As rotas definidas em orders.routes.ts direcionam as requisições HTTP para os métodos correspondentes no OrdersController.

Controlador: O OrdersController recebe as requisições e utiliza o CreateOrderService para processar a lógica de criação de pedidos.

Serviço: O CreateOrderService aplica a lógica de negócios necessária e interage com o OrdersRepository para persistir os dados no banco.

Repositório: O OrdersRepository implementa a interface IOrdersRepository e utiliza o TypeORM para realizar operações no banco de dados relacionadas à entidade Order.

Entidade: A entidade Order define a estrutura da tabela de pedidos no banco de dados e é utilizada pelo TypeORM para mapear os dados.

DTO: O CreateOrderDTO define a estrutura dos dados necessários para criar um novo pedido, garantindo que o serviço receba as informações corretas.

Essa organização modular e a clara separação de responsabilidades facilitam a manutenção e escalabilidade do projeto, permitindo que cada componente seja desenvolvido e testado de forma independente.


Exemplo atual da entidade order

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Product from './OrderProduct';
import GraduationCommission from '../../../../../modules/graduation-commission/infra/typeorm/entities/GraduationCommission';


@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cliente: string;

  @Column('date')
  dataPedido: Date;

  @Column()
  celular: string;

  @OneToMany(() => Product, product => product.order, { eager: true, cascade: true })
  produtos: Product[];

  @Column()
  numeroArte: string;

  @Column('date')
  dataEvento: Date;

  @Column('decimal')
  valorFrete: number;

  @Column()
  cep: string;

  @Column()
  prazo: string;

  @Column()
  rua: string;

  @Column('decimal')
  valorTotal: number;

  @Column('varchar', { nullable: true })
  imagem: string;

  @Column('decimal')
  valorSinal: number;

  @Column('decimal')
  faltaPagar: number;

  @Column('date')
  dataEntrega: Date;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    default: 'não confirmado', 
  })
  pagamentoVerificado?: 'não confirmado' | 'confirmado 50%' | 'confirmado 100%' | null;

  @Column({ type: 'text', nullable: true })
  observacao?: string;

  @Column({ type: 'varchar', nullable: true })
  formaPagamento?: string;

  @Column({ type: 'varchar', nullable: true })
  numeroPedido: string;

  @Column({ type: 'varchar', nullable: true })
  nomeVendedor: string;

  @Column({ type: 'varchar', nullable: true })
  nomeDesigner: string;


  @ManyToOne(() => GraduationCommission)
  @JoinColumn({ name: 'comissao_formatura_id' })
  comissaoFormatura: GraduationCommission;

  @Column({ type: 'uuid', nullable: true, name: 'comissao_formatura_id' }) 
  comissaoFormaturaId?: string;

  @Column({ type: 'varchar', nullable: true, name: 'tipo_desconto' }) 
  tipoDesconto: 'CUPOM_FORMANDO_15' | 'CUPOM_COMISSAO_35' | null;

  @Column({ type: 'varchar', nullable: true, name: 'padrao_desconto' }) 
  padraoDesconto: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
