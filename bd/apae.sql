-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 27/05/2020 às 08:33
-- Versão do servidor: 5.7.30-0ubuntu0.18.04.1
-- Versão do PHP: 7.2.24-0ubuntu0.18.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `apae`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `alunos`
--

CREATE TABLE `alunos` (
  `NOME` varchar(36) DEFAULT NULL,
  `NASC` varchar(10) DEFAULT NULL,
  `RG-ALUNO` varchar(9) DEFAULT NULL,
  `CPF-ALUNO` varchar(11) DEFAULT NULL,
  `CNS` varchar(20) DEFAULT NULL,
  `CGM` varchar(10) DEFAULT NULL,
  `CERTIDAO` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `alunos`
--

INSERT INTO `alunos` (`NOME`, `NASC`, `RG-ALUNO`, `CPF-ALUNO`, `CNS`, `CGM`, `CERTIDAO`) VALUES
(' ABRAÃO MANOEL CARDOSO TAVARES GOMES', '', '', '', '898 00 29 608 689 96', '', ''),
(' ANA CLARA ALMEIDA BORGES', '16/06/2016', '', '', ' 700 0002 3541 1102', '1018891901', ''),
(' ANA CLARA DINIZ ', '26/02/2003', '132399107', '9655809978', ' 80 1434 111 622 238', '9114560003', 'L42 F169 N7719'),
(' ANA LAURA MESQUITA DA SILVA', '14/08/2018', '', '14405418926', ' 898 0058 8515 7695', '1020145583', '079889 01 55 2018 1 00479 175 0192699 82'),
(' ANGELITA DE LIMA DA SILVA ', '20/08/1981', '91205025', '1055459960', ' 80 1434 111 622 173', '9114560232', 'L315 F3 N1119'),
(' ANTHONY FELIPE GAINO DE ASSIS', '09/09/2017', '', '13567818961', ' 702 3081 5184 2510', '1021308010', '081794 01 55 2017 1 00046 449 0035408 19'),
(' ANTONIO MACEDO DINIS ', '02/11/1993', '105897810', '7354777951', ' 160 989 971 370 001', '9003350298', 'L16 F159 N3374'),
(' APARECIDA TAÍS PEREIRA CAMPOS', '20/08/1981', '94380189', '1021686956', ' 204 070 278 520 001', '9114560259', 'L33 F239 N2510'),
(' ARIEL GOMES DO NASCIMENTO', '03/04/2005', '137245493', '5260421922', ' 898 0011 1760 5665', '9112082023', 'L117 F153 N030950'),
(' ARINALDO ALVES DOS SANTOS JÚNIOR ', '06/09/1982', '107526587', '1101720948', ' 204 070 295 100 007', '9114560267', 'L122 F170 N131850'),
(' CARLOS ALBERTO DE ABREU ', '11/01/1984', '443959183', '23218988870', ' 898 0023 1819 3217', '1004302695', 'L110 F294 N111671'),
(' CÁSSIA DE JESUS MARTINS ', '01/02/2001', '383145144', '34343804852', ' 704 3065 1147 6299', '1018646150', 'L31 F186 N5884'),
(' CLAUDICÉIA PORFÍRIO GOMES ', '01/06/1985', '104129021', '1107476909', ' 80 1434 111 622 297', '9114560348', 'L34 F250 N3754'),
(' CLEMILDA FORNARO DOS PASSOS ', '08/08/1976', '91878348', '1090539908', ' 204 070 273 130 000', '9114560356', 'L31 F284 N287'),
(' CRÍSTIAN SEMINI PREGÍDIO ', '24/03/1988', '98631712', '6201567917', ' 163 551 343 530 008', '9114560364', 'L20 F29 N2358'),
(' DALVA ROSA ', '08/10/1969', '97855994', '1044479906', '80 1434 111 622 300', '9114560399', 'L28 F259 N16797'),
(' DANIEL LIMA MARANGONI', '25/10/2014', '', '', ' 898 0045 2343 0219', '1019711621', ''),
(' DANIEL ROSA DE ARAÚJO ', '13/10/1966', '84166103', '1026214971', ' 80 1434 111 622 319', '9114560402', ''),
(' DANIELE DE OLIVEIRA LEITE ', '19/03/1999', '138082997', '5152938901', ' 80 1434 111 622 327', '9114560410', ''),
(' DAVI LUCAS DE ASSIS FERREIRA', '23/06/2018', '', '14285841967', ' 703 4012 7462 0517', '', ''),
(' DAVI LUCCA CHEDID CORRÊA', '22/04/2017', '', '13289335984', ' 700 0001 4659 8908', '1021886358', '080614 01 55 2017 1 00235 107 0148441 43'),
(' DAVI LUCCA MOREIRA DE MELO', '28/01/2017', '', '13114598986', ' 898 0051 5217 4806', '1021823518', ''),
(' DAYANE FERNANDA DE OLIVEIRA SABEC', '06/09/1986', '105544359', '1130143929', ' 80 1434 111 635 364', '9114560429', ''),
(' EDSON DE SOUZA ', '02/01/1978', '131556462', '1111749965', ' 898 0010 4011 6983', '9114560437', '080945 01 55 19781 00032 191 0001119 62'),
(' ELISA DE OLIVEIRA DOMINGUES', '21/06/2017', '', '13404877993', ' 898 0051 7015 9627', '1021886196', ''),
(' EMANUEL SANTOS BIGOLI ', '28/04/2009', '132628173', '8928353971', ' 801 4341 170 64334', '9115062490', ''),
(' ENZO GABRIEL ANUNCIAÇÃO DE JESUS', '27/11/2015', '', '', ' 898 0048 8138 6974', '1014758549', ''),
(' ENZO MIGUEL VITALINO ZANETINI', '08/12/2015', '157201298', '13784291929', ' 898 0048 8551 8654', '1015581340', ''),
(' FRANCISCO EMANUEL MEDEIROS LIMA', '12/01/2016', '', '', ' 706 8042 0530 7221', '1019312565', ''),
(' GABRIEL TEIXEIRA DA LUZ', '08/09/1997', '107577270', '6829306957', ' 704 2017 8015 1182', '71720608', '082644 01 55 1997 1 00038 095 0021360 11'),
(' GIOVANA DE OLIVEIRA SANTOS ', '15/07/2004', '', '7743478998', ' 80 1434 111 622 386', '', ''),
(' GIOVANA RODRIGUES DA COSTA ', '06/01/1999', '105499361', '5669625943', ' 80 1434 111 622 378', '9114560470', 'NÃO TEM NA PASTA'),
(' GUILHERME ROSSETO DE SOUZA', '01/10/1993', '124678170', '6355836900', ' 898 0049 1188 7925', '9114580098', '080614 01 55 1993 1 00071 379 0066281 14'),
(' GUSTAVO RODRIGUES DOS SANTOS', '15/08/2002', '138232271', '6376747906', ' 80 1434 111 622 394', '9114560488', 'L42 F063 N7613'),
(' ÍCARO GABRIEL DE SOUZA SIMÕES', '25/07/2012', '', '12973622921', '898 0045 0681 8484', '1013499027', '080945 01 55 2012 1 00050 017 0009167 01'),
(' JOÃO MIGUEL BUZZO', '19/08/2012', '', '11160511926', ' 898 0045 1047 8137', '1013528817', '080945 01 55 2012 1 00050 033 0009183 49'),
(' JOSÉ FELIPHE ROSA ALENCAR', '14/03/2016', '624888617', '', ' 898 0049 9758 5299', '1019768640', '122697 01 55 2016 1 01263 154 0729761 15'),
(' JOSENILTON GOMES DA SILVA ', '22/09/1968', '79287598', '5214008996', ' 80 1434 111 622 440', '9114560534', 'L64 F67 N19468'),
(' JULIA ELOÁ SANTOS DE OLIVEIRA', '14/02/2018', '', '13947892977', ' 702 4060 3944 7521', '1019930625', '081695 01 55 2018 1 00088 348 0063690 10'),
(' JULIA LUANA DOS SANTOS CANDIDO', '11/09/2009', '', '11544944977', ' 898 0039 6344 9219', '9114561050', 'L47 F176 N8726'),
(' KENEDY YAGO PAULINO RISCALLI', '03/09/2012', '', '5946954229', ' 708 6045 2356 8280', '1016214775', '096370 01 55 2012 1 00201 022 0075872 55'),
(' LEANDRO DA SILVA ', '20/02/1991', '140557250', '34532434807', ' 80 1434 111 622 475', '9114560569', 'L36 F35 N5295'),
(' LEONAM GABRIEL PERRI ', '27/09/2002', '1494532', '06224478902', ' 898 0037 3605 7786', '9114680009', 'L62 F62 N8918'),
(' LIDIANE RAFAELA DE OLIVEIRA DONÃ ', '11/05/1982', '103068444', '1102858919', ' 204 050 505 980 008', '9114560585', 'L34 F003 N2768'),
(' MARIA APARECIDA DOMINGOS ', '04/10/1951', '', '1078717931', ' 80 1434 114 312 949', '9114560640', ''),
(' MARIA FERNANDA SILVA', '27/01/2018', '', '13906766926', ' 898 0058 3737 3855', '1021807113', ''),
(' MARIA LARISSA MONTEIRO DE LIMA', '06/11/2011', '', '', ' 898 0034 2770 2466', '1015742247', ''),
(' MARIA RITA MOREIRA CAPARRÓZ', '26/06/2003', '105771088', '6307214910', ' 80 1434 111 622 521', '326806382', ''),
(' MATHIAS RAFAEL', '12/07/1993', '54900481', '6704430938', ' 704 0008 9880 8569', '9114560666', ''),
(' MIRIAN SALLES FRANCISQUETE ', '27/06/1990', '149579354', '80023867957', ' 706 2000 3344 7561', '9111500921', ''),
(' MURILO AUGUSTO KNOOR RIBEIRO', '13/09/2012', '', '', ' 898 0034 8199 1276', '1006170192', ''),
(' OTÁVIO HENRIQUE RODRIGUES DA COSTA', '16/07/2013', '', '', ' 898 0040 4301 6664', '1008831390', ''),
(' PAULO SERGIO OLIMPIO', '10/04/1973', '124302927', '1180404998', ' 898 0000 0448 782', '71801179', ''),
(' PEDRO HENRIQUE DA SILVA', '22/07/2013', '', '', ' 898 0040 4269 8788', '1013878796', ''),
(' RENAN ENRIQUE MARTINS ', '15/03/2002', '', '6220329929', ' 703 0008 4521 5573', '9114520028', '0826020155 2002 1 00009 296 0008839 83'),
(' RONI DE LIMA SANTOS', '11/10/1988', '108840765', '7435109924', ' 706 8057 4462 0822', '26702313', ''),
(' TATIANE MARCELA VALÉRIO', '27/04/2000', '137107090', '6537628954', ' 705 4044 6160 3794', '911506111', '081695 01 55 2000 1 00045 176 0037718 99'),
(' THAÍS LORANN MORAIS DE ALMEIDA ', '09/01/1989', '99663367', '5510611979', ' 80 1434 111 622 599', '9114560720', ''),
(' VICTOR KAWAN FARIAS DA SILVA', '30/01/2014', '149861637', '80028581903', ' 700 1009 8331 9816', '1010594134', '081299 01 55 2014 1 00028 203 0018504 61'),
(' VIVIANE CAMILA TRANCOSO ', '23/08/1993', '', '6730796944', ' 898 0004 2525 2649', '9114620510', ''),
('ENZO GABRIEL BARBOSA DA SILVA', '08/05/2016', '', '15009108992', ' 898 0051 0977 1857', '1021807407', ''),
('LAVINIA DOS SANTOS RODRIGUES', '29/09/2018', '', '14509068930', ' 707 1053 5869 3220', '1020749969', '081794 01 55 2018 1 00048 169 0036328 71'),
('LAVÍNIA GABRIELLY FABRICIO COSTA', '', '', '', ' 898 0059 0453 5882', '', ''),
('LUAN DOS SANTOS BARRETO', '12/11/2003', '127487332', '8613790984', ' 898 0012 9744 7478', '960402448', ''),
('LUCAS FELIPE SALÇO WARGA', '07/05/2019', '', '14999075911', ' 704 6031 9114 1229', '1021810440', ''),
('LUCAS OLIVEIRA SOARES', '24/10/2003', '500748287', '38257022861', ' 700 0085 4937 9802', '1014034680', ''),
('LUCIANO DOS SANTOS ', '08/01/1986', '86939746', '', ' 898 0004 3569 1866', '71801446', ''),
('MÁRCIA GAINO DA SILVA ', '02/05/1996', '149757325', '', '', '69241093', ''),
('MARIA ALICE PEREIRA DO NASCIMENTO', '12/11/2015', '', '14880421952', ' 898 0058 0517 5772', '1021384670', '080945 01 55 2015 1 00052 176 0009726 17'),
('NICOLLE DA SILVA GUIMARAES', '28/05/2004', '140587367', '11282531948', '', '69686958', ''),
('RENATA CRISTINA CRISOSTOMO ', '02/04/1988', '105514808', '7044442919', ' 80 1434 111 622 572', '9114560747', ''),
('Taisa (filho tem down e cartiopatia)', '', '', '', '', '', ''),
('VALESKA ELOÍSA ELENTÉRIO', '', '', '', '898002369561116', '', ''),
('VITOR MANOEL GARCIA VALENTE', '25/03/2014', '', '13543803980', '708 1085 8438 5532 ', '1018446550', '082636 01 55 2014 1 00050 284 0008466 66'),
('renan santos coutinho', '20/06/1988', '104856365', '06587583903', '12345677454', '898775456', '456a456a456a'),
('renne santos coutinho', '16/10/1986', '104856365', '06587583903', '45648597878454', '1234567', '456a456a46a5'),
('teste', '123451', '1234', '123', '654', '83', '123a1a21a');

-- --------------------------------------------------------

--
-- Estrutura para tabela `contatos`
--

CREATE TABLE `contatos` (
  `NOME` varchar(36) DEFAULT NULL,
  `ENDEREÇO` varchar(38) DEFAULT NULL,
  `NUM` varchar(5) DEFAULT NULL,
  `COD-COPEL` varchar(9) DEFAULT NULL,
  `TELEFONE 1` varchar(62) DEFAULT NULL,
  `TELEFONE 2` varchar(23) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `contatos`
--

INSERT INTO `contatos` (`NOME`, `ENDEREÇO`, `NUM`, `COD-COPEL`, `TELEFONE 1`, `TELEFONE 2`) VALUES
(' ABRAÃO MANOEL CARDOSO TAVARES GOMES', 'Chácara Santa Clara', ' S/N', '', ' 9 9907-7849', ''),
(' ANA CLARA ALMEIDA BORGES', ' Rua Vandir Minto', ' 251', '', ' 9 9922-1875 Eliana', ' 3272-2473 Orlando '),
(' ANA CLARA DINIZ ', ' Rua Pernambuco', ' 220', '13308700', ' 9 9668-1882', ''),
(' ANA LAURA MESQUITA DA SILVA', ' Rua Amigo Francisco Bento', ' 270', '101045760', ' 9 9671-3359 mãe ', ' 9 9665-6258 pai'),
(' ANGELITA DE LIMA DA SILVA ', ' Rua Iolanda Stefanato', '61', '77673832', ' 9 9864-8887', ' 3272-2787 '),
(' ANTHONY FELIPE GAINO DE ASSIS', 'Rua Apucarana ', '51', '60101750', ' 99807-8153 mãe ', ' 99848-8636 pai'),
(' ANTONIO MACEDO DINIS ', 'Rua Antonio Trapp', '291', '99208717', ' 99165-4217', ' (43) 9 9156-3244 '),
(' APARECIDA TAÍS PEREIRA CAMPOS', 'Chácara Primavera', 'Rural', '80112676', ' 9 9966-8825', ''),
(' ARIEL GOMES DO NASCIMENTO', ' Rua Rio Grande do Sul', ' 441', '105567000', ' 9 9921-3515', ''),
(' ARINALDO ALVES DOS SANTOS JÚNIOR ', ' Rua Celestino Esteves', '1', '26829835', ' 9 9912-0919 pai ', ' 9 9981-2184 Cida'),
(' CARLOS ALBERTO DE ABREU ', ' Rua Bahia', ' 510', '13313576', ' 99824-5978', ''),
(' CÁSSIA DE JESUS MARTINS ', 'Rua Placido de Castro', '435', '65285352', '', ''),
(' CLAUDICÉIA PORFÍRIO GOMES ', ' Rua Antonio Bellido Hernandez', ' 164', '104249250', ' 9 9963-3544 (Roseli irmã)', ''),
(' CLEMILDA FORNARO DOS PASSOS ', ' Rua Bahia', ' 580', '68163495', ' 9618-6703', ''),
(' CRÍSTIAN SEMINI PREGÍDIO ', ' Rua Santa Catarina', ' 30 ', '78309859', ' 9685-8258', ' 3272-1817 '),
(' DALVA ROSA ', ' Rua Anita Garibaldi', ' 451', '85323578', ' 9676-8313 Vilma', ' 3272-3205 '),
(' DANIEL LIMA MARANGONI', ' Rua Goiás', ' 408', '', ' 9 9637-5772', ''),
(' DANIEL ROSA DE ARAÚJO ', ' Rua São José', '', '', ' 99832-3404 Rosa', ' Tereza 3272-1029 '),
(' DANIELE DE OLIVEIRA LEITE ', ' Rua Atílio Leonardi', '34', '', ' 9 9679-7781', ''),
(' DAVI LUCAS DE ASSIS FERREIRA', ' Rua Curitiba', ' 591', '', ' 9 9197-1159', ''),
(' DAVI LUCCA CHEDID CORRÊA', ' Rua Pará', ' 221', '75320851', ' (43) 9 9833-4664', ''),
(' DAVI LUCCA MOREIRA DE MELO', ' Rua Judit Sales Jacob', '80', '', ' (43) 9 9975-1983', ''),
(' DAYANE FERNANDA DE OLIVEIRA SABEC', ' Av. São Paulo', ' 230', '', ' 9963-1213', ' 3272-3185 '),
(' EDSON DE SOUZA ', ' Rua Ibiporã', ' 100', '85512907', ' 9 9816-3377 filha da Adriana', ''),
(' ELISA DE OLIVEIRA DOMINGUES', ' Rua Maria Alves da Silva Duda ', '85 A', '', ' 9 9831-3986', ' 9 9960-0612 mãe '),
(' EMANUEL SANTOS BIGOLI ', ' Rua Maracai', '5', '', ' 9 9851-5564', ''),
(' ENZO GABRIEL ANUNCIAÇÃO DE JESUS', ' Rua Francisco Bordin', '5', '', ' 99609-7216 MÃE', ' 9 9696-8146 PAI'),
(' ENZO MIGUEL VITALINO ZANETINI', ' Rua Antonio Bellido Hernandez', ' 231', '', ' 99663-5478 pai  9 9624-3780 avó', ' 99693-9264 mãe '),
(' FRANCISCO EMANUEL MEDEIROS LIMA', ' Rua Bahia', ' 497', '', ' 99919-1226 pai', ' 99846-1255 mãe '),
(' GABRIEL TEIXEIRA DA LUZ', ' Avenida Paraná', ' 931', '', ' 9 9633-2932 - Sérgio', ' 3272-1340 '),
(' GIOVANA DE OLIVEIRA SANTOS ', ' Rua Mato Grosso', ' 525', '', '', ''),
(' GIOVANA RODRIGUES DA COSTA ', ' Rua Aracajú', '13', '29698332', ' 9985-8047', ''),
(' GUILHERME ROSSETO DE SOUZA', ' Avenida Paraná', ' 931', '13312758', ' 9 9633-2932 – Sérgio  99675-1642 Alex', ' 3272-1340 '),
(' GUSTAVO RODRIGUES DOS SANTOS', ' Rua Hugo da Silva Pereira', '7', '19221665', ' 9 9179-7498', ' 9 9840-5669 '),
(' ÍCARO GABRIEL DE SOUZA SIMÕES', ' Rua Arapongas', ' 221', '47705477', ' 99810-6466 avó  99985-3227 tia', ' 99926-5435 mãe '),
(' JOÃO MIGUEL BUZZO', ' Rua João Antonio de Moraes', ' 366', '21409749', ' 9681-3100', ''),
(' JOSÉ FELIPHE ROSA ALENCAR', ' Rua Plácido de Castro', ' 520', '100383955', ' 99699-8552 mãe', ''),
(' JOSENILTON GOMES DA SILVA ', ' Rua São José', '52', '13319493', ' 99608-5869 irmão', ' 9 9619-2129 (MÃE) '),
(' JULIA ELOÁ SANTOS DE OLIVEIRA', ' Rua Maria de Lourdes Pereira', ' 10 ', '94678545', ' 9 9917-2494', ''),
(' JULIA LUANA DOS SANTOS CANDIDO', ' Rua Antonio de Oliveira', ' 215', '100884130', ' 99867771 mãe', ' 44 99285141 '),
(' KENEDY YAGO PAULINO RISCALLI', ' Rua Antonio de Oliveira', ' 355', '105341622', ' 9 9800-8817', ''),
(' LEANDRO DA SILVA ', ' Rua Curitiba', ' 591', '97388866', '', ''),
(' LEONAM GABRIEL PERRI ', ' Chácara Nossa Senhora de Fátima', 'RURAL', '77165675', ' 99139-1750 avô', ' 9 9961-1052 mãe '),
(' LIDIANE RAFAELA DE OLIVEIRA DONÃ ', ' Rua São José dos Bandeirantes', ' 111', '89570243', ' 99603-0837 Téia  99600-0310 tio', ' 9 9964-7870 Carla '),
(' MARIA APARECIDA DOMINGOS ', ' Rua João Antonio de Morais', ' 290', '', ' 3272-1651', ''),
(' MARIA FERNANDA SILVA', ' Rua Maringá II', '31', '', ' 9 9977-5945 pai  9 9979-2179 avó', ' 9 9908-6725 mãe '),
(' MARIA LARISSA MONTEIRO DE LIMA', ' Rua José João Marioto', ' 301', '', ' 988445855 pai', ' 98845-5957 mãe '),
(' MARIA RITA MOREIRA CAPARRÓZ', ' Rua São José dos Bandeirantes', ' 170', '', ' 3272-1494 (loja)  9 9129-3485 Eli', ' 3272-1343 '),
(' MATHIAS RAFAEL', ' Rua São José', '11', '', ' 99609-5748 pai', ''),
(' MIRIAN SALLES FRANCISQUETE ', ' Avenida Paraná', ' 931', '', ' 9 9633-2932 - Sérgio', ' 3272-1340 '),
(' MURILO AUGUSTO KNOOR RIBEIRO', ' Rua Santa Catarina', ' 150', '', ' 9 9828-1618', ''),
(' OTÁVIO HENRIQUE RODRIGUES DA COSTA', ' Rua Aracajú', '13', '', ' 9985-8047', ''),
(' PAULO SERGIO OLIMPIO', ' Avenida Paraná', ' 931', '', ' 3272-1340', ''),
(' PEDRO HENRIQUE DA SILVA', ' Rua Miguel Evangelista Campos', '70', '', ' 9 9961-7333 pai', ' 9 9820-5335 '),
(' RENAN ENRIQUE MARTINS ', 'Rua Bahia ', '511', '83635602', ' 9 9609-5831', ''),
(' RONI DE LIMA SANTOS', ' Rua Plácido de Castro', ' 351', '', ' 9 9692-4515', ''),
(' TATIANE MARCELA VALÉRIO', 'Est Tucum', 'Rural', '14332523', ' (43) 9 9609-7425', ''),
(' THAÍS LORANN MORAIS DE ALMEIDA ', ' Rua Pascoal Bombece ', '479 ', '', ' 9648-2203 (mãe)  99600-0787 tia Eliane  99965-2447 tia Cleide', ' 99988-2338 Sérgio mot '),
(' VICTOR KAWAN FARIAS DA SILVA', 'Fazenda Nobre (JTA/GCI)', 'Rural', '13323890', ' 99812-3135 padrasto', ' 99964-4532 mãe '),
(' VIVIANE CAMILA TRANCOSO ', ' Rua Joao Antonio de Moraes', ' 290', '26926814', ' 3272-1651', ''),
('ENZO GABRIEL BARBOSA DA SILVA', ' Rua Francisco Theobaldo Netto ', '221 ', '', ' 9 9671-3221 pai', ' 9 9619-7512 mãe '),
('LAVINIA DOS SANTOS RODRIGUES', ' Rua Belém', ' 249', '91428777', ' 9 9968-6448 pai  9 9866-2319 avó', ' 9 9874-4234 mãe '),
('LAVÍNIA GABRIELLY FABRICIO COSTA', ' São José dos Bandeirantes', ' 251', '', ' 9 9901-3962 (Sandra avó)', ''),
('LUAN DOS SANTOS BARRETO', ' Sítio Taquari Km 9 – Saída p/ Guaraci', '', '', ' (44) 9 9773-5301', ''),
('LUCAS FELIPE SALÇO WARGA', ' Fazenda Estância Três Irmãos', '', '', ' (44) 9 9975-7730', ''),
('LUCAS OLIVEIRA SOARES', ' Rua Elvira Botos de Oliveira', ' 190', '', ' 9 96344900', ''),
('LUCIANO DOS SANTOS ', ' Avenida Paraná', ' 931', '', ' 9 9633-2932 - Sérgio', ' 3272-1340 '),
('MÁRCIA GAINO DA SILVA ', ' Rua Arapongas', '7', '', ' 3272-1652 Sonia', ' 9 9956-8106 (Nelson) '),
('MARIA ALICE PEREIRA DO NASCIMENTO', ' Rua Antonio Bellido Hernandez', ' 190', '104435739', ' 9 9629-8291 pai', ' 9 9680-2736 mãe '),
('NICOLLE DA SILVA GUIMARAES', 'Estrada Velha Jta Mir', 'Rural', '13324209', '98437-9779', ''),
('RENATA CRISTINA CRISOSTOMO ', ' Rua Isaias Paulo Rodrigues', '30', '', ' 8807-0166', ''),
('Taisa (filho tem down e cartiopatia)', '', '', '', '99930-8351', ''),
('VALESKA ELOÍSA ELENTÉRIO', ' Rua Pedro de Abreu Passos', '9', '', ' 99865-0956 mãe', ''),
('VITOR MANOEL GARCIA VALENTE', 'Rua Maranhao', '171', '97534250', '99101-0223', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `funcionarios`
--

CREATE TABLE `funcionarios` (
  `NOME` varchar(42) DEFAULT NULL,
  `NASC` varchar(10) DEFAULT NULL,
  `RG` varchar(9) DEFAULT NULL,
  `CPF` varchar(13) DEFAULT NULL,
  `PIS` varchar(16) DEFAULT NULL,
  `ENDEREÇO` varchar(33) DEFAULT NULL,
  `Nº` varchar(3) DEFAULT NULL,
  `BAIRRO` varchar(33) DEFAULT NULL,
  `TELEFONE` varchar(17) DEFAULT NULL,
  `EMAIL` varchar(33) DEFAULT NULL,
  `ADMISSÃO` varchar(10) DEFAULT NULL,
  `CONTATO` varchar(10) DEFAULT NULL,
  `CARGO` varchar(38) DEFAULT NULL,
  `OCUPACAO` varchar(18) DEFAULT NULL,
  `CH-M` varchar(2) DEFAULT NULL,
  `TURNO` varchar(5) DEFAULT NULL,
  `VINCULO` varchar(10) DEFAULT NULL,
  `BRIGADA` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `funcionarios`
--

INSERT INTO `funcionarios` (`NOME`, `NASC`, `RG`, `CPF`, `PIS`, `ENDEREÇO`, `Nº`, `BAIRRO`, `TELEFONE`, `EMAIL`, `ADMISSÃO`, `CONTATO`, `CARGO`, `OCUPACAO`, `CH-M`, `TURNO`, `VINCULO`, `BRIGADA`) VALUES
('ADRIANA BORGES FERREIRA MICHELON', '23/07/1984', '129015861', ' 04742255933', ' 128.72052.49.8', ' Rua Antonio de Oliveira', '101', ' Jardim Oliveira', ' 9685-8303', ' adrianaborges725@gmail.com', '01/08/2018', '', 'PROFESSOR REGENTE', 'REGENTE I', '20', 'MANHA', 'SEED', 'NÃO'),
('ALEX YUDI ALVES OZAWA', '', '', '', '', '', '', '', '', '', '', '', 'ESTAGIÁRIO', 'AUX.ADMINISTRATIVO', '', '', 'PREFEITURA', ''),
('APARECIDA DE LOURDES ZANETI DA SILVA ALVES', '23/01/1962', '30025792', ' 36084794904', '12073363700', ' Rua Astorga', '150', ' Centro', '9963-7144', '', '20/12/2005', '3272-1220', ' Professora Readaptada', '', '', '', 'QPM', ''),
('CAROLINA MARCATO GIORDANI', '06/09/1983', '75044755', ' 04857501988', ' 200.75914.06.3', ' Rua Presidente Getúlio Vargas', '55', ' Centro – São Martinho - Rolândia', '9966-4626', ' carolmarcato@yahoo.com.br', '12/04/2005', '3240-1327', ' Fisioterapeuta - CREFITO: 8/71613 – F', '', '', '', 'SUS', ''),
('CÉLIA APARECIDA ARALI BOTTAZZARI', '03/11/1956', '14164391', ' 27985415904', '10764140040', ' Rua Nemésio Jacob', '64', ' Centro', '9937-0337', ' celiaarali@gmail.com', '17/04/2006', '3272-1566', 'PROFESSOR REGENTE', 'REGENTE I', '20', 'TARDE', 'QPM', 'SIM'),
('CRISTIANE FRANCISCO', '07/06/1980', '76884919', ' 03193925977', ' 128.40412.50-2', ' Avenida Paraná', '660', ' Centro', ' 9909-5524', ' cristianefrancisco@hotmail.com', '01/08/2018', '', ' Pedagoga', '', '', '', 'SEED', ''),
('CRISTINA APARECIDA ALVES', '09/09/1975', '60928746', ' 01937638936', ' 125.91958.53.1', ' Rua Janina de Oliveira', '10', ' Jardim Canaã', ' 9930-6563', ' cristinaepaulocalixto@gmail.com', '12/04/2005', '997605356', 'PROFESSOR REGENTE', 'REGENTE I', '20', 'MANHA', 'QPM', 'SIM'),
('DANIELLE ALESSANDRA MERANCA CHIARARIA', '04/09/1977', '60204020', ' 03114156959', ' 129.86838.49-0', ' Rua dos Cordeiros', '13', ' Vila Cordeiro', '9937-8840', ' daniellemeranca@hotmail.com', '01/03/2004', '3272-1981', ' Psicóloga - CRP: 08/07679-7', '', '', '', 'SUS', ''),
('EDNA MARIA DA SILVA URIAS', '11/09/1978', '63292564', ' 02986870970', ' 1.902.950.334-6', ' Rua José Medeiros Ribeiro', '70', ' Jardim Brasil', ' 44- 9989-7957', ' ednaurias@gmail.com', '25/04/2019', '', ' Zeladora', '', '', '', 'SEED', ''),
('ELIANA APARECIDA DA SILVA DE MATOS', '20/12/1976', '153775761', ' 02027582908', ' 125.87000.49-3', ' Rua Vicente da Silva de Matos', '260', ' Centro', '', ' elianapmatos@gmail.com', '01/08/2018', '', ' Zeladora', '', '', '', 'SEED', ''),
('EMILLY CHRISTINA KLANN', '29/10/1985', '97714193', ' 05518430981', ' 129.25228.49-8', ' Av. São Paulo', '421', ' Centro', ' 9811-9350', ' emillyklann29@gmail.com', '22/02/2013', '', ' Atendente', '', '', '', 'SEED', ''),
('FABÍOLA DE OLIVEIRA', '08/05/1975', '53006965', ' 00811457990', ' 180.46631.77.4', ' Rua Rosa Ricardo Domingues', '191', ' Residencial Rosa', '9929-9478', ' fabíola_kanabata@hotmail.com', '20/12/2005', '3272-1522', 'PROFESSOR REGENTE', 'EDUCAÇÃO FÍSICA', '16', 'TARDE', 'QPM', ''),
('FABRICIO MOREIRA RODRIGUES', '09/07/1998', '126927150', ' 11289044970', ' 125.83065.35-3', '', '', ' Centro', '', ' fabriciodirceumoreira@gmail.com', '14/03/2017', '', ' Instrutor de Equino', '', '', '', 'APAE', ''),
('GISELI CRISTINA DOS SANTOS SCIENA', '04/01/1983', '80451598', '04281840907', '126.877.135-21', 'Rua Mato Grosso', '210', 'Astorga', '(44) 99906-6150', '', '18/02/2020', '', 'PROFESSOR REGENTE', 'REGENTE I', '20', 'TARDE', 'SEED', ''),
('ISABELLE MARIANO DOS SANTOS', '12/05/1980', '76951217', ' 03483943900', ' 128.90099.51-4', ' Rua Cornélio Consalter', '', ' Centro', ' (43) 9659 0300', 'Sercom_dp@hotmail.com', '14/03/2008', '', ' Fonoaudióloga – CRFª 9468-PR/P', '', '', '', 'SUS', ''),
('KARINE PAIÃO DA SILVA', '02/06/1983', '91878674', ' 00145672107', ' 129.47409.53-3', ' Rua Belém', '28', ' Centro', ' 9625-8168', '', '01/11/2017', '', ' Instrutora', '', '', '', 'SEED', ''),
('LEILA CRISTINA PAYÃO ESTEVES', '22/04/1988', '99223170', '  06622819939', ' 130.66218.49-9', ' Rua Pará', '351', ' Centro', ' 9 9633-2098', ' leilapayao22@gmail.com', '03/06/2019', '', ' Atendente', '', '', '', 'SEED', ''),
('LIANA MARA VALÉRIO MARTINS', '06/12/1964', '39389495', ' 01934460907', ' 130.26460.51-5', ' Rua Roberto Gomes Pedrosa', '100', ' Centro - Guaraci', ' 9 9104-7375', 'lianavalerio45@gmail.com', '01/08/2018', '', 'PROFESSOR REGENTE', 'REGENTE II', '20', 'TARDE', 'SEED', ''),
('LIDIANE CRISTINA DE OLIVEIRA FRANCO', '16/04/1987', '436266106', '35535880809', '206.229.289-23', 'Rua Londrina', '71', 'Jaguapitã', '99968-6455', '', '17/02/2020', '', 'PROFESSOR REGENTE', 'REGENTE I', '20', 'TARDE', 'SEED', ''),
('LUCIANA DOS REIS NASCIMENTO', '16/09/1967', '45684610', ' 80607535920', ' 123.4161533.5', ' Rua Antonio Trapp', '150', ' Santa Amélia', ' 9811-0917', ' lucianajesus827@gmail.com', '01/08/2018', '9811-0918', ' Atendente', '', '', '', 'SEED', ''),
('LUCIANA DOS SANTOS', '26/07/1982', '88716124', ' 04115500980', ' 128.09944.52-2', ' Rua Sergio Pinheiro dos Santos', '321', ' Residencial Jardim Bella', ' (43) 9 9610-9504', ' luciana.lldos@gmail.com', '01/08/2018', '', ' Zeladora', '', '', '', 'SEED', ''),
('MARCIA APARECIDA ANTONIO DO NASCIMENTO', '24/03/1972', '51499859', ' 03674848970', ' 127.836735-27', ' Rua Porto', '27', ' Jardim Coelho', ' 99674-6676', ' marciaantonio@seed.pr.gov.br', '01/08/2018', '3272-2121', ' Atendente', '', '', '', 'SEED', ''),
('MARCIA CRISTINA TARGA DA SILVA', '12/03/1976', '64860550', ' 00736193960', ' 127.73323.50-7', ' Rua Sebastião Martins de Azevedo', '1', ' Conjunto Bandeirantes', ' 8826-4378', ' marciactarga@gmail.com', '01/08/2018', '9109-8325', ' Zeladora', '', '', '', 'SEED', ''),
('MARIELE ROSA DOS SANTOS PORTUGUES', '27/04/1981', '83416777', ' 04195968950', ' 160.56858.91-0', ' Rua André Podeleskis', '60', ' Centro', ' 9954-4778', ' marielerosa27@hotmail.com', '01/07/2006', '3272-1267', ' Psicóloga – CRP: 08/11833', '', '', '', 'SUS', ''),
('MILENA ALMEIDA BARBOSA', '25/02/1994', '447470267', ' 42482442842', '2048920972-9', ' Rua Maranhão', '175', ' Centro', ' (14) 98119-6410', ' milenaalmeidabarbosa25@gmail.com', '29/03/2016', '', ' Terapeuta Ocupacional', '', '', '', 'SUS', ''),
('ORLANDO DE ARAÚJO BORGES', '05/06/1962', '39085976', ' 36589705968', ' 120.39376.46-3', ' Rua Pará', '400', ' Centro', '99611-0799', '', '03/04/2012', '3272-2473', ' Motorista', '', '', '', 'APAE', ''),
('QUITERIA MENDES BATISTA', '23/06/1974', '123162056', ' 07840566928', ' 163.95047.07-9', ' Rua Içara', '22', ' Centro', ' 9609-9298', ' quiteriamendesbarbosa@gmail.com', '07/06/2010', '3272-1735', ' Zeladora', '', '', '', 'SEED', ''),
('RAFAELA CARRARA', '12/11/1987', '88352513', ' 06141778984', ' 131.98357.53-4', ' Rua Anita Garibaldi', '141', ' Centro', ' (43) 9 9966-0436', ' rafaelacarrara@gmail.com', '01/08/2018', '', 'PROFESSOR REGENTE', 'REGENTE I', '20', 'TARDE', 'SEED', ''),
('RENAN SANTOS COUTINHO', '20/06/1988', '104856365', '6587583903', '13032820498', 'Rua Antonio Fiorentini', '38', 'Astorga', '(44) 9 9718-5175', 'renanrocks2009@gmail.com', '22/01/2020', 'x', 'Secretário', '', '', '', 'SEED', 'SIM'),
('SANDRA ROSA DE ARAUJO CARRARA', '25/11/1975', '70427133', ' 01898016976', ' 126.95775.51-4', ' Chácara Ouro Verde', '', ' Jaguapitã', ' (43) 9609-6897', ' sandrarosacarrara@hotmail.com', '01/08/2018', '8808-5556', 'PROFESSOR REGENTE', 'ARTE', '5', 'MANHA', 'SEED', ''),
('SILVIA APARECIDA DA SILVA', '21/02/1979', '77754369', ' 03744641970', ' 127.62536.53.9', ' Avenida Manoel Ribas', '351', ' Centro', '9632-1404', ' silviamadagabi@hotmail.com', '01/08/2018', ' 3272-1686', 'PROFESSOR REGENTE', 'REGENTE II', '20', 'TARDE', 'SEED', ''),
('SILVIA RODRIGUES GONÇALVES', '11/03/1972', '56561897', ' 83813373991', ' 124.35992.33.7', ' Avenida São Paulo', '12', ' Centro', ' 9976-5406', ' silviarg_72@hotmail.com', '17/04/2006', '3272-1182', ' Diretora', '', '', '', 'QPM', 'SIM'),
('SIMONE MARTON', '27/02/1984', '405685221', ' 04734375976', ' 128.71322.50-5', ' Rua Cornélio Consalter', '', ' Centro', ' (43) 9938-5118 ', ' monymarton@hotmail.com', '02/01/2008', 'x', ' Assistente Social – CRESS: 6415', '', '', '', 'SUS', ''),
('SUIANE SALVADOR BOZO ALVES', '06/08/1972', '58409405', ' 00753091909', '20.407.036.223', ' Rua Adão Santa Cruz', '42', ' Jardim Maravilha', ' (43) 9 9914-8692', ' suianesalvador@gmail.com', '01/08/2018', '', 'PROFESSOR REGENTE', 'REGENTE I', '20', 'MANHA', 'SEED', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `maes`
--

CREATE TABLE `maes` (
  `NOME` varchar(36) DEFAULT NULL,
  `MAE` varchar(42) DEFAULT NULL,
  `RG-MAE` varchar(10) DEFAULT NULL,
  `CPF-MAE` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `maes`
--

INSERT INTO `maes` (`NOME`, `MAE`, `RG-MAE`, `CPF-MAE`) VALUES
(' ABRAÃO MANOEL CARDOSO TAVARES GOMES', 'Dayane Manuela Cardoso Silva', '', ''),
(' ANA CLARA ALMEIDA BORGES', ' Naiara Nunes de Almeida', '', ''),
(' ANA CLARA DINIZ ', ' Maria Camila Diniz', '97795193', '15632494802'),
(' ANA LAURA MESQUITA DA SILVA', ' Ellen Dayane de Souza Mesquita', '366423745', '05534209925'),
(' ANGELITA DE LIMA DA SILVA ', ' Lurde Ferreira de Lima', '86568179', '02234877911'),
(' ANTHONY FELIPE GAINO DE ASSIS', ' Rosilaine Gaino', '10246551', '06894717931'),
(' ANTONIO MACEDO DINIS ', ' Maria Neide Dinis', '100628724', '05978945900'),
(' APARECIDA TAÍS PEREIRA CAMPOS', ' Luzia de Matos', '91818710', '70837538904'),
(' ARIEL GOMES DO NASCIMENTO', ' Graciete Ribeiro de Oliveira', '7219722-4', '05260421922'),
(' ARINALDO ALVES DOS SANTOS JÚNIOR ', ' Alaíde da Silva dos Santos', 'X', 'X'),
(' CARLOS ALBERTO DE ABREU ', ' Nair de Melo de Abreu', '289004366', '34050144840'),
(' CÁSSIA DE JESUS MARTINS ', ' Maria Jesus Dias', '2223483720', '12635140812'),
(' CLAUDICÉIA PORFÍRIO GOMES ', ' Maria Aparecida Barbosa Gomes', '', ''),
(' CLEMILDA FORNARO DOS PASSOS ', ' Inair Fornaro dos Passos', '', ''),
(' CRÍSTIAN SEMINI PREGÍDIO ', ' Maria de Jesus', '82512276', '03245987935'),
(' DALVA ROSA ', ' Natália Aconché Rosa', '', ''),
(' DANIEL LIMA MARANGONI', ' Luana Lima Azevedo', '', ''),
(' DANIEL ROSA DE ARAÚJO ', ' Ana Raimunda de Araújo', '', ''),
(' DANIELE DE OLIVEIRA LEITE ', ' Elizângela Garcino de Oliveira', '', ''),
(' DAVI LUCAS DE ASSIS FERREIRA', ' Heloísa de Assis Ferreira', '', ''),
(' DAVI LUCCA CHEDID CORRÊA', ' Dayane Chedid Bibiano Guimarães', '96189133', '06138866908'),
(' DAVI LUCCA MOREIRA DE MELO', ' Juliana Fernanda de Carvalho Moreira', '', ''),
(' DAYANE FERNANDA DE OLIVEIRA SABEC', ' Silvana Aparecida de Oliveira', '', ''),
(' EDSON DE SOUZA ', ' Lourdes Aparecida Goulart', '', ''),
(' ELISA DE OLIVEIRA DOMINGUES', ' Michele Fernanda de Oliveira', '', ''),
(' EMANUEL SANTOS BIGOLI ', ' Ana Claudia da Costa Santos', '', ''),
(' ENZO GABRIEL ANUNCIAÇÃO DE JESUS', ' Nildete Anunciação Nunes', '', ''),
(' ENZO MIGUEL VITALINO ZANETINI', ' Eloiza Mara Vitalino', '', ''),
(' FRANCISCO EMANUEL MEDEIROS LIMA', ' Alexandra Regina Medeiros Lima', '85364391', '04529099962'),
(' GABRIEL TEIXEIRA DA LUZ', ' Eleonor da Silva Gaia da Luz', '91031418', '06780257974'),
(' GIOVANA DE OLIVEIRA SANTOS ', ' Rosilene de Oliveira Zanelatto', '', ''),
(' GIOVANA RODRIGUES DA COSTA ', ' Aparecida Cândido da Costa', '51251970', '7336399991'),
(' GUILHERME ROSSETO DE SOUZA', ' Elis Regina Rosseto', '', ''),
(' GUSTAVO RODRIGUES DOS SANTOS', ' Maria das Dores Rodrigues do Carmo', '66155668', '03086134909'),
(' ÍCARO GABRIEL DE SOUZA SIMÕES', ' Cecília Aparecida de Souza Simões', '75742177', '06753812903'),
(' JOÃO MIGUEL BUZZO', ' Josiane Aqueline da Costa Buzzo', '62503033', '00029412951'),
(' JOSÉ FELIPHE ROSA ALENCAR', ' Elizangela de Fátima Rosa', '496655140', '32232879810'),
(' JOSENILTON GOMES DA SILVA ', ' Izanira Gomes da Silva', '645550', '85794180978'),
(' JULIA ELOÁ SANTOS DE OLIVEIRA', ' Ingledy Aynoan Santos de Oliveira', '147765339', '12374764966'),
(' JULIA LUANA DOS SANTOS CANDIDO', ' Ana Paula dos Santos Candido', '1082219', '9402892921'),
(' KENEDY YAGO PAULINO RISCALLI', ' Marcia Luciana Paulino', '000785291', '73522350278'),
(' LEANDRO DA SILVA ', ' Maria Ferreira da Silva', '77737707', '23037217847'),
(' LEONAM GABRIEL PERRI ', ' Daniela Cristina Botissari Perri', '76524378', '03537864973'),
(' LIDIANE RAFAELA DE OLIVEIRA DONÃ ', ' Maria Aparecida de Oliveira Donã', '', ''),
(' MARIA APARECIDA DOMINGOS ', ' Tereza Domingos', '', ''),
(' MARIA FERNANDA SILVA', ' Elisangela da Silva', '', ''),
(' MARIA LARISSA MONTEIRO DE LIMA', ' Maria Cecília da Costa Lima', '', ''),
(' MARIA RITA MOREIRA CAPARRÓZ', ' Maria Elizângela da Silva Caparróz', '', ''),
(' MATHIAS RAFAEL', ' Marcia Regina Pereira Rafael', '', ''),
(' MIRIAN SALLES FRANCISQUETE ', ' Roseli Salles Francisquete', '', ''),
(' MURILO AUGUSTO KNOOR RIBEIRO', ' Luciana Knoor Ribeiro', '', ''),
(' OTÁVIO HENRIQUE RODRIGUES DA COSTA', ' Giovana Rodrigues da Costa', '', ''),
(' PAULO SERGIO OLIMPIO', ' Benedita Cardamone Olimpio', '', ''),
(' PEDRO HENRIQUE DA SILVA', ' Juliana de Souza da Silva', '', ''),
(' RENAN ENRIQUE MARTINS ', ' Lucineia Aparecida Inácio', '76523231', ''),
(' RONI DE LIMA SANTOS', ' Marinalva de Lima Santos', '', ''),
(' TATIANE MARCELA VALÉRIO', ' Eliane Alves de Oliveira Valério', '72820150', '03306265900'),
(' THAÍS LORANN MORAIS DE ALMEIDA ', ' Nilza de morais Almeida', '', ''),
(' VICTOR KAWAN FARIAS DA SILVA', ' Gucione Eline Farias', '135510501', '11207997919'),
(' VIVIANE CAMILA TRANCOSO ', ' Sonia Maria Custodio', '', ''),
('ENZO GABRIEL BARBOSA DA SILVA', ' Bruna Carolini Barbosa', '', ''),
('LAVINIA DOS SANTOS RODRIGUES', ' Maria Eduarda dos Santos', '102466950', '10517516918'),
('LAVÍNIA GABRIELLY FABRICIO COSTA', 'Gabriela Aparecida Fabricio', '', ''),
('LUAN DOS SANTOS BARRETO', ' Vera Lucia dos Santos', '', ''),
('LUCAS FELIPE SALÇO WARGA', ' Bárbara Juliana Salço Warga', '', ''),
('LUCAS OLIVEIRA SOARES', ' Maria Aparecida de Oliveira', '', ''),
('LUCIANO DOS SANTOS ', ' Marinita José Miguel dos Santos', '', ''),
('MÁRCIA GAINO DA SILVA ', ' Ana Maria Gaino', '', ''),
('MARIA ALICE PEREIRA DO NASCIMENTO', ' Adriana Pereira de Oliveira do Nascimento', '86375702', '07092282950'),
('NICOLLE DA SILVA GUIMARAES', 'Luana Josefa da Silva', '', ''),
('RENATA CRISTINA CRISOSTOMO ', ' Aparecida Amaro', '', ''),
('Taisa (filho tem down e cartiopatia)', '', '', ''),
('VALESKA ELOÍSA ELENTÉRIO', 'Beatriz Gomes Elentério', '', ''),
('VITOR MANOEL GARCIA VALENTE', 'ANA ELISA GARCIA SASSANI', '132620059', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pais`
--

CREATE TABLE `pais` (
  `NOME` varchar(36) DEFAULT NULL,
  `PAI` varchar(34) DEFAULT NULL,
  `RG-PAI` varchar(9) DEFAULT NULL,
  `CPF-PAI` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `pais`
--

INSERT INTO `pais` (`NOME`, `PAI`, `RG-PAI`, `CPF-PAI`) VALUES
(' ABRAÃO MANOEL CARDOSO TAVARES GOMES', '', '', ''),
(' ANA CLARA ALMEIDA BORGES', ' Alessandro Rodrigues Borges', '', ''),
(' ANA CLARA DINIZ ', '', '', ''),
(' ANA LAURA MESQUITA DA SILVA', ' Raimundo Nonato da Silva', '300908179', '26800851833'),
(' ANGELITA DE LIMA DA SILVA ', ' Manuel José da Silva', '', ''),
(' ANTHONY FELIPE GAINO DE ASSIS', ' Osni Carlos Machado de Assis', '124878470', '8134104959'),
(' ANTONIO MACEDO DINIS ', '', '', ''),
(' APARECIDA TAÍS PEREIRA CAMPOS', ' Sebastião Pereira Campos', '', ''),
(' ARIEL GOMES DO NASCIMENTO', ' Edvalso Gomes do Nascimento', '', ''),
(' ARINALDO ALVES DOS SANTOS JÚNIOR ', ' Arinaldo Alves dos Santos', 'X', 'X'),
(' CARLOS ALBERTO DE ABREU ', ' José Antônio de Abreu', '', ''),
(' CÁSSIA DE JESUS MARTINS ', ' José Martins', '', ''),
(' CLAUDICÉIA PORFÍRIO GOMES ', ' Antônio Porfírio Gomes', '', ''),
(' CLEMILDA FORNARO DOS PASSOS ', ' Luiz José dos Passos', '', ''),
(' CRÍSTIAN SEMINI PREGÍDIO ', ' Nivaldo José Pregídio', '', ''),
(' DALVA ROSA ', ' Natal Rosa', '', ''),
(' DANIEL LIMA MARANGONI', ' Vinicius Fernandes Marangoni', '', ''),
(' DANIEL ROSA DE ARAÚJO ', ' Geraldo Rosa de Araújo', '', ''),
(' DANIELE DE OLIVEIRA LEITE ', ' Silvio César Leite', '', ''),
(' DAVI LUCAS DE ASSIS FERREIRA', '', '', ''),
(' DAVI LUCCA CHEDID CORRÊA', ' César Augusto Corrêa', '103567823', '7652115990'),
(' DAVI LUCCA MOREIRA DE MELO', ' Damião de Melo', '', ''),
(' DAYANE FERNANDA DE OLIVEIRA SABEC', ' Luiz Carlos Sabec', '', ''),
(' EDSON DE SOUZA ', ' Osvaldo de Souza', '', ''),
(' ELISA DE OLIVEIRA DOMINGUES', ' Alex Sandro Domingues', '', ''),
(' EMANUEL SANTOS BIGOLI ', ' Wagner Bigoli', '', ''),
(' ENZO GABRIEL ANUNCIAÇÃO DE JESUS', ' Adalberto Alves De Jesus Filho', '', ''),
(' ENZO MIGUEL VITALINO ZANETINI', ' Claudio Renato Tadeu Zanetini', '', ''),
(' FRANCISCO EMANUEL MEDEIROS LIMA', ' Willian Lucas Ferreira Lima', '86440288', '4513480955'),
(' GABRIEL TEIXEIRA DA LUZ', ' Amarildo Teixeira da Luz', '', ''),
(' GIOVANA DE OLIVEIRA SANTOS ', ' Paulo dos Santos', '', ''),
(' GIOVANA RODRIGUES DA COSTA ', ' Ademir Rodrigues da Costa', '', ''),
(' GUILHERME ROSSETO DE SOUZA', ' Nelson Francisco de Souza', '', ''),
(' GUSTAVO RODRIGUES DOS SANTOS', ' Juventino Joaquim dos Santos', '', ''),
(' ÍCARO GABRIEL DE SOUZA SIMÕES', ' Mauro Rodrigues Simões', '', ''),
(' JOÃO MIGUEL BUZZO', ' Claudio Aparecido Buzzo', '16640573', '23901934987'),
(' JOSÉ FELIPHE ROSA ALENCAR', ' José Osmar Lopes de Alencar', '257984343', '8826583870'),
(' JOSENILTON GOMES DA SILVA ', ' José Figueredo da Silva', '', ''),
(' JULIA ELOÁ SANTOS DE OLIVEIRA', ' João Batista de Oliveira Marques', '107113312', '7123187989'),
(' JULIA LUANA DOS SANTOS CANDIDO', 'Thiago Miguel Spadacio', '393564800', '7179379921'),
(' KENEDY YAGO PAULINO RISCALLI', ' Sebastião Riscalli', '', ''),
(' LEANDRO DA SILVA ', ' Milton da Silva', '', ''),
(' LEONAM GABRIEL PERRI ', ' Ronaldo Luís Perri', '', ''),
(' LIDIANE RAFAELA DE OLIVEIRA DONÃ ', ' Valdeci Balisteros Donã', '', ''),
(' MARIA APARECIDA DOMINGOS ', ' Hercílio Domingos', '', ''),
(' MARIA FERNANDA SILVA', ' Roberto da Silva', '', ''),
(' MARIA LARISSA MONTEIRO DE LIMA', ' João Monteiro da Silva Neto', '', ''),
(' MARIA RITA MOREIRA CAPARRÓZ', ' Hermes Caparróz Filho', '', ''),
(' MATHIAS RAFAEL', ' Antonio Rafael', '', ''),
(' MIRIAN SALLES FRANCISQUETE ', ' Marcio Francisquete', '', ''),
(' MURILO AUGUSTO KNOOR RIBEIRO', ' Eduardo Henrique Figueira Ribeiro', '', ''),
(' OTÁVIO HENRIQUE RODRIGUES DA COSTA', 'Aparecida Candido', '', ''),
(' PAULO SERGIO OLIMPIO', ' Lázaro Olimpio', '', ''),
(' PEDRO HENRIQUE DA SILVA', ' Marciel Leandro da Silva', '', ''),
(' RENAN ENRIQUE MARTINS ', ' Marcos Rogério Martins', '', ''),
(' RONI DE LIMA SANTOS', ' Rubens dos Santos', '', ''),
(' TATIANE MARCELA VALÉRIO', ' Donisete Valério', '', ''),
(' THAÍS LORANN MORAIS DE ALMEIDA ', ' Cilso Conceição de Almeida', '', ''),
(' VICTOR KAWAN FARIAS DA SILVA', ' Everson Ferreira da Silva', '', ''),
(' VIVIANE CAMILA TRANCOSO ', ' Airton Trancoso', '', ''),
('ENZO GABRIEL BARBOSA DA SILVA', ' Edson da Silva', '', ''),
('LAVINIA DOS SANTOS RODRIGUES', ' Jeferson Batista Rodrigues', '106416737', '08912659960'),
('LAVÍNIA GABRIELLY FABRICIO COSTA', '', '', ''),
('LUAN DOS SANTOS BARRETO', ' Valdomiro Nunes Barreto', '', ''),
('LUCAS FELIPE SALÇO WARGA', ' Valdenir Warga', '', ''),
('LUCAS OLIVEIRA SOARES', ' José Oliveira Soares', '', ''),
('LUCIANO DOS SANTOS ', 'Sergio de Alencar', '', ''),
('MÁRCIA GAINO DA SILVA ', ' Antonio Vicente da Silva Junior', '', ''),
('MARIA ALICE PEREIRA DO NASCIMENTO', ' José Mauro do Nascimento', '30201850', '36082392949'),
('NICOLLE DA SILVA GUIMARAES', 'Alex Sandro Ribeiro Guimaraes', '335972731', '5876288985'),
('RENATA CRISTINA CRISOSTOMO ', ' João Batista Crisostomo', '', ''),
('Taisa (filho tem down e cartiopatia)', '', '', ''),
('VALESKA ELOÍSA ELENTÉRIO', '', '', ''),
('VITOR MANOEL GARCIA VALENTE', 'LUIZ MAURÍCIO VALENTE', '', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `responsaveis`
--

CREATE TABLE `responsaveis` (
  `NOME` varchar(36) DEFAULT NULL,
  `RESP` varchar(38) DEFAULT NULL,
  `RG-RESP` varchar(9) DEFAULT NULL,
  `CPF-RESP` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `responsaveis`
--

INSERT INTO `responsaveis` (`NOME`, `RESP`, `RG-RESP`, `CPF-RESP`) VALUES
(' ABRAÃO MANOEL CARDOSO TAVARES GOMES', '', '', ''),
(' ANA CLARA ALMEIDA BORGES', ' Orlando de Araújo Borges', '', ''),
(' ANA CLARA DINIZ ', 'MÃE', '', ''),
(' ANA LAURA MESQUITA DA SILVA', 'MÃE', '', ''),
(' ANGELITA DE LIMA DA SILVA ', 'MÃE', '', ''),
(' ANTHONY FELIPE GAINO DE ASSIS', 'MÃE', '', ''),
(' ANTONIO MACEDO DINIS ', 'MÃE', '', ''),
(' APARECIDA TAÍS PEREIRA CAMPOS', 'MÃE', '', ''),
(' ARIEL GOMES DO NASCIMENTO', 'MÃE', '', ''),
(' ARINALDO ALVES DOS SANTOS JÚNIOR ', 'MÃE', '', ''),
(' CARLOS ALBERTO DE ABREU ', 'MÃE', '', ''),
(' CÁSSIA DE JESUS MARTINS ', 'MÃE', '', ''),
(' CLAUDICÉIA PORFÍRIO GOMES ', 'Maria Socorro Silva de Souza', '93794460', '04348602980'),
(' CLEMILDA FORNARO DOS PASSOS ', 'Marli Dos Passos Santos', '86112809', '06007636925'),
(' CRÍSTIAN SEMINI PREGÍDIO ', 'MÃE', '', ''),
(' DALVA ROSA ', 'Ozelia Rosa', '77009876', ''),
(' DANIEL LIMA MARANGONI', ' Maria Aparecida De Souza Lima', '', ''),
(' DANIEL ROSA DE ARAÚJO ', ' Rosa de Araújo', '', ''),
(' DANIELE DE OLIVEIRA LEITE ', '', '', ''),
(' DAVI LUCAS DE ASSIS FERREIRA', '', '', ''),
(' DAVI LUCCA CHEDID CORRÊA', 'MÃE', '', ''),
(' DAVI LUCCA MOREIRA DE MELO', '', '', ''),
(' DAYANE FERNANDA DE OLIVEIRA SABEC', '', '', ''),
(' EDSON DE SOUZA ', ' Adriana de Souza', '339475250', '34778494857'),
(' ELISA DE OLIVEIRA DOMINGUES', '', '', ''),
(' EMANUEL SANTOS BIGOLI ', '', '', ''),
(' ENZO GABRIEL ANUNCIAÇÃO DE JESUS', '', '', ''),
(' ENZO MIGUEL VITALINO ZANETINI', '', '', ''),
(' FRANCISCO EMANUEL MEDEIROS LIMA', 'MÃE', '', ''),
(' GABRIEL TEIXEIRA DA LUZ', 'Camila Thaisa Nobrega e Silva', '91031418', '06780257974'),
(' GIOVANA DE OLIVEIRA SANTOS ', '', '', ''),
(' GIOVANA RODRIGUES DA COSTA ', 'MÃE', '', ''),
(' GUILHERME ROSSETO DE SOUZA', 'Camila Thaisa Nobrega e Silva', '91031418', '06780257974'),
(' GUSTAVO RODRIGUES DOS SANTOS', 'MÃE', '', ''),
(' ÍCARO GABRIEL DE SOUZA SIMÕES', 'MÃE', '', ''),
(' JOÃO MIGUEL BUZZO', 'MÃE', '', ''),
(' JOSÉ FELIPHE ROSA ALENCAR', '', '', ''),
(' JOSENILTON GOMES DA SILVA ', 'MÃE', '', ''),
(' JULIA ELOÁ SANTOS DE OLIVEIRA', 'MÃE', '', ''),
(' JULIA LUANA DOS SANTOS CANDIDO', 'MÃE', '', ''),
(' KENEDY YAGO PAULINO RISCALLI', '', '', ''),
(' LEANDRO DA SILVA ', '', '', ''),
(' LEONAM GABRIEL PERRI ', 'MÃE', '', ''),
(' LIDIANE RAFAELA DE OLIVEIRA DONÃ ', ' Francisca Tereza de Jesus Bento (Tia)', '76127115', '230159'),
(' MARIA APARECIDA DOMINGOS ', '  Fabio Biondo', '', ''),
(' MARIA FERNANDA SILVA', '', '', ''),
(' MARIA LARISSA MONTEIRO DE LIMA', '', '', ''),
(' MARIA RITA MOREIRA CAPARRÓZ', '', '', ''),
(' MATHIAS RAFAEL', '', '', ''),
(' MIRIAN SALLES FRANCISQUETE ', '  Sergio de Alencar', '', ''),
(' MURILO AUGUSTO KNOOR RIBEIRO', '', '', ''),
(' OTÁVIO HENRIQUE RODRIGUES DA COSTA', '', '', ''),
(' PAULO SERGIO OLIMPIO', ' Sergio de Alencar', '', ''),
(' PEDRO HENRIQUE DA SILVA', '', '', ''),
(' RENAN ENRIQUE MARTINS ', 'MÃE', '', ''),
(' RONI DE LIMA SANTOS', '', '', ''),
(' TATIANE MARCELA VALÉRIO', 'MÃE', '', ''),
(' THAÍS LORANN MORAIS DE ALMEIDA ', '', '', ''),
(' VICTOR KAWAN FARIAS DA SILVA', 'MÃE', '', ''),
(' VIVIANE CAMILA TRANCOSO ', ' Fabio Biondo', '69006345', '03364124957'),
('ENZO GABRIEL BARBOSA DA SILVA', '', '', ''),
('LAVINIA DOS SANTOS RODRIGUES', '', '', ''),
('LAVÍNIA GABRIELLY FABRICIO COSTA', '', '', ''),
('LUAN DOS SANTOS BARRETO', '', '', ''),
('LUCAS FELIPE SALÇO WARGA', '', '', ''),
('LUCAS OLIVEIRA SOARES', '', '', ''),
('LUCIANO DOS SANTOS ', '', '', ''),
('MÁRCIA GAINO DA SILVA ', '  Doralice Ribeiro Gaino', '', ''),
('MARIA ALICE PEREIRA DO NASCIMENTO', 'MÃE', '', ''),
('NICOLLE DA SILVA GUIMARAES', 'Pai', '', ''),
('RENATA CRISTINA CRISOSTOMO ', '', '', ''),
('Taisa (filho tem down e cartiopatia)', '', '', ''),
('VALESKA ELOÍSA ELENTÉRIO', '', '', ''),
('VITOR MANOEL GARCIA VALENTE', 'MÃE', '', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
