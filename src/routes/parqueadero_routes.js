import { Router } from "express";
import {
  actualizarParqueadero,
  detalleParqueadero,
  cambiarEstadoParqueadero,
  listarDisponibilidadParqueaderos,
  listarParqueaderos,
  registrarParqueadero,
} from "../controllers/parquedero_controller.js";

import verificarAdmin from "../middlewares/autenticacionAdmin.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Parqueadero:
 *       type: object
 *       required:
 *         - numero
 *         - bloque
 *         - tipo
 *       properties:
 *         _id:
 *           type: string
 *           description: ID del parqueadero
 *         numero:
 *           type: integer
 *           description: Número del parqueadero
 *         bloque:
 *           type: string
 *           description: Bloque del parqueadero
 *         tipo:
 *           type: string
 *           description: Tipo de parqueadero
 *         disponibilidad:
 *           type: boolean
 *           description: Indica si el parqueadero está disponible
 *         dimensiones:
 *           type: string
 *           description: Dimensiones del parqueadero
 *         reservado:
 *           type: boolean
 *           description: Estado de reserva del parqueadero
 *         estado:
 *           type: boolean
 *           description: Estado del parqueadero
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de actualización
 *         __v:
 *           type: integer
 *           description: Versión del documento
 *       example:
 *         numero: 101
 *         bloque: 6666
 *         tipo: normal
 *         disponibilidad: true
 *         dimensiones: 5x2
 *         reservado: false
 *         estado: true
 *         createdAt: 2022-01-01T00:00:00.000Z
 *         updatedAt: 2022-01-01T00:00:00.000Z
 *         __v: 0
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   - name: Parqueaderos
 *     description: Operaciones relacionadas con parqueaderos
 */

/**
 * @swagger
 * /api/parqueaderos/registrar:
 *   post:
 *     summary: Registrar un nuevo parqueadero
 *     tags: [Parqueaderos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Parqueadero'
 *           examples:
 *             nuevoParqueadero:
 *               value:
 *                 numero: 101
 *                 bloque: A
 *                 tipo: Automóvil
 *                 disponibilidad: true
 *                 dimensiones: 5x2
 *     responses:
 *       200:
 *         description: Parqueadero registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de éxito
 *               example:
 *                 msg: Parqueadero registrado exitosamente
 *       400:
 *         description: Error al registrar parqueadero
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *             examples:
 *               validación incompleta:
 *                 value:
 *                   msg: Lo sentimos, debe llenar todos los campos
 *               Parqueadero ya registrado:
 *                 value:
 *                   msg: Lo sentimos, este parqueadero ya esta registrado
 *       404:
 *         description: token no valido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                  msg: Lo sentimos primero debe proporcionar un token
 */
router.post("/parqueaderos/registrar", verificarAdmin, registrarParqueadero);

/**
 * @swagger
 * /api/parqueaderos/disponibilidad:
 *   get:
 *     summary: Listar disponibilidad de parqueaderos
 *     tags: [Parqueaderos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de parqueaderos disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Parqueadero'
 *
 *       203:
 *         description: Sin disponiblidad de parqueaderos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                  msg: Lo sentimos, por el momento no hay parqueaderos disponibles
 *       404:
 *         description: token no valido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                  msg: Lo sentimos primero debe proporcionar un token
 */
router.get(
  "/parqueaderos/disponibilidad",
  verificarAdmin,
  listarDisponibilidadParqueaderos
);

/**
 * @swagger
 * /api/parqueaderos:
 *   get:
 *     summary: Listar todos los parqueaderos
 *     tags: [Parqueaderos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los parqueaderos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Parqueadero'
 *       404:
 *         description: token no valido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                  msg: Lo sentimos primero debe proporcionar un token
 */
router.get("/parqueaderos", verificarAdmin, listarParqueaderos);

/**
 * @swagger
 * /api/parqueaderos/{id}:
 *   get:
 *     summary: Obtener detalles de un parqueadero específico
 *     tags: [Parqueaderos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del parqueadero
 *     responses:
 *       200:
 *         description: Detalles del parqueadero
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parqueadero'
 *       404:
 *         description: token no valido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *             examples:
 *               Token no valido:
 *                 value:
 *                   msg: Lo sentimos primero debe proporcionar un token
 *               Id inexistente:
 *                 value:
 *                   msg: El id que acaba de ingresar no existe
 */
router.get("/parqueaderos/:id", verificarAdmin, detalleParqueadero);

/**
 * @swagger
 * /api/parqueaderos/{id}:
 *   put:
 *     summary: Actualizar un parqueadero
 *     tags: [Parqueaderos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del parqueadero a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Parqueadero'
 *           examples:
 *             Actualizar parqueadero:
 *               value:
 *                 numero: 102
 *                 bloque: B
 *                 tipo: Automóvil
 *                 disponibilidad: false
 *                 dimensiones: 5x2
 *     responses:
*       200:
 *         description: Actualización exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                  msg: Parqueadero actualizado con exito
 *       400:
 *         description: Error al actualizar el parqueadero
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *             examples:
 *               Id inexistente:
 *                 value:
 *                   msg: El id que acaba de ingresar no existe
 *               Validación incompleta:
 *                 value:
 *                   msg: Lo sentimos, debe llenar todos los campos
*       404:
 *         description: token no valido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *               example:
 *                  msg: Lo sentimos primero debe proporcionar un token
 */
router.put("/parqueaderos/:id", verificarAdmin, actualizarParqueadero);

/**
 * @swagger
 * /api/parqueaderos/{id}:
 *   patch:
 *     summary: Cambiar el estado de un parqueadero
 *     tags: [Parqueaderos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del parqueadero a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: boolean
 *                 description: Nuevo estado del parqueadero
 *             example:
 *               estado: true
 *     responses:
 *       200:
 *         description: token no válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *             example:
 *               msg: El estado del parqueadero ha sido actualizado con exito
 *       400:
 *         description: Parqueadero actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje 
 *             examples:
 *               Id inexistente:
 *                 value:
 *                   msg: El id que acaba de ingresar no existe
 *               Validación incompleta:
 *                 value:
 *                   msg: Lo sentimos, el campo no debe de estar vacio
 *       404:
 *         description: token no válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error
 *             example:
 *               msg: Lo sentimos primero debe proporcionar un token
 */

router.patch("/parqueaderos/:id", verificarAdmin, cambiarEstadoParqueadero);

export default router;
