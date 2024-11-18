// src/modules/graduationCommission/infra/http/routes/graduationCommission.routes.ts

import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';

import GraduationCommissionController from '../controllers/GraduationCommissionController';

const graduationCommissionRouter = Router();
const graduationCommissionController = new GraduationCommissionController();
const upload = multer(uploadConfig);

// Rota para criação de uma nova comissão de formatura, com upload de documento
graduationCommissionRouter.post('/', upload.single('documentoAssinatura'), graduationCommissionController.create);

// Rota para listagem de todas as comissões de formatura
graduationCommissionRouter.get('/', graduationCommissionController.list);

// Rota para atualização de uma comissão de formatura específica pelo ID
graduationCommissionRouter.patch('/:id', upload.single('documentoAssinatura'), graduationCommissionController.update);

// Rota para exclusão de uma comissão de formatura específica pelo ID
graduationCommissionRouter.delete('/:id', graduationCommissionController.delete);

export default graduationCommissionRouter;
