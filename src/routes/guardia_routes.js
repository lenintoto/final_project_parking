import { Router } from "express";
import {
  actualizarPerfil,
  enviarParqueaderosAUsuarios,
  login,
  perfil,
  verParqueaderosDisponibles,
} from "../controllers/guardia_controller.js";
import verificarRol from "../middlewares/autenticacion.js";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Guardia
 *  description: Endpoints para guardias
 */

/**
 * @swagger
 * /api/guardias/login:
 *  post:
 *      summary: Login de guardia
 *      tags: [Guardia]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: El email del guardia
 *                          password:
 *                              type: string
 *                              format: password
 *                              description: La contraseña debe ser segura
 *                      example:
 *                           correo: tobema9541@bsidesmn.com
 *                           password: Juanito.123
 *      responses:
 *          200:
 *              description: Login exitoso
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  description: El id del guardia
 *                              token:
 *                                  type: string
 *                                  description: El token del guardia
 *                              nombre:
 *                                  type: string
 *                                  description: El nombre del guardia
 *                              apellido:
 *                                  type: string
 *                                  description: El apellido del guardia
 *                              telefono:
 *                                  type: string
 *                                  description: El telefono del guardia
 *                          example:
 *                              _id: 60f3a9b9a0b9b0b9b0b9b0b9
 *                              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTVkMGYzMWE5MjQxYWRlOWNiNjJhOCIsInJvbCI6Imd1YXJkaWEiLCJpYXQiOjE3MjEwOTQ0MjIsImV4cCI6MTcyMTE4MDgyMn0.lGmyzTbE7xCdTK74_XANAsILSTXcFhD_KTwoaC6-ncQ
 *                              nombre: Sebastian
 *                              apellido: Almeida
 *                              telefono: 0998736473
 *          400:
 *              description: Error de validación
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: El mensaje de error
 *                          example:
 *                              msg: Lo sentimos debe llenar todos los campos
 *          404:
 *              description: Error al iniciar sesión
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: El mensaje de error
 *                      examples:
 *                        Validación incompleta:
 *                          value:
 *                            msg: Lo sentimos debe llenar todos los campos
 *                        Usuario no registrado:
 *                          value:
 *                            msg: Lo sentimos ese email no se encuentra registrado
 *                        ContraseñaIncorrecta:
 *                          value:
 *                            msg: Lo sentimos contraseña incorrecta
 */
router.post("/guardias/login", login);

/**
 * @swagger
 * /api/guardias/perfil:
 *  get:
 *      summary: Ver perfil del guardia
 *      tags: [Guardia]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Perfil del guardia
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: string
 *                                  description: El id del guardia
 *                              nombre:
 *                                  type: string
 *                                  description: El nombre del guardia
 *                              apellido:
 *                                  type: string
 *                                  description: El apellido del guardia
 *                              cedula:
 *                                  type: string
 *                                  description: Número de cédula del guardia
 *                              correo:
 *                                  type: string
 *                                  description: El email del guardia
 *                              telefono:
 *                                  type: number
 *                                  description: El telefono del guardia
 *                              estado:
 *                                  type: boolean
 *                                  description: El estado del guardia
 *                          example:
 *                              id: 60f3a9b9a0b9b0b9b0b9b0b9
 *                              nombre: Sebastian
 *                              apellido: Almeida
 *                              cedula: 1000000000
 *                              correo: tobema9541@bsidesmn.com
 *                              telefono: 0998736473
 *                              estado: true
 *          404:
 *              description: No autorizado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Mensaje de error
 *                          example:
 *                              msg: Lo sentimos primero debe proporcionar un token
 */
router.get("/guardias/perfil", verificarRol, perfil);

/**
 * @swagger
 * /api/guardias/parqueaderos-disponibles:
 *  get:
 *      summary: Ver parqueaderos disponibles
 *      tags: [Guardia]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          202:
 *              description: Lista de parqueaderos disponibles
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      description: ID del parqueadero
 *                                  numero:
 *                                      type: integer
 *                                      description: Número del parqueadero
 *                                  bloque:
 *                                      type: string
 *                                      description: Bloque del parqueadero
 *                                  tipo:
 *                                      type: string
 *                                      description: Tipo de parqueadero
 *                                  disponibilidad:
 *                                      type: boolean
 *                                      description: Disponibilidad del parqueadero
 *                                  dimensiones:
 *                                      type: string
 *                                      description: Dimensiones del parqueadero
 *                                  reservado:
 *                                      type: boolean
 *                                      description: Estado de reserva del parqueadero
 *                                  estado:
 *                                      type: boolean
 *                                      description: Estado del parqueadero
 *                                  createdAt:
 *                                      type: string
 *                                      format: date-time
 *                                      description: Fecha de creación
 *                                  updatedAt:
 *                                      type: string
 *                                      format: date-time
 *                                      description: Fecha de actualización
 *                                  __v:
 *                                      type: integer
 *                                      description: Versión del documento
 *                          example:
 *                              _id: 60f3a9b9a0b9b0b9b0b9b0b9
 *                              numero: 1
 *                              bloque: A
 *                              tipo: Parqueadero
 *                              disponibilidad: true
 *                              dimensiones: 20x20
 *                              reservado: false
 *                              estado: true
 *                              createdAt: 2022-01-01T00:00:00.000Z
 *                              updatedAt: 2022-01-01T00:00:00.000Z
 *                              __v: 0
 *          403:
 *              description: No autorizado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Mensaje de error
 *                          example:
 *                              msg: Lo sentimos primero debe proporcionar un token
 */
router.get(
  "/guardias/parqueaderos-disponibles",
  verificarRol,
  verParqueaderosDisponibles
);

/**
 * @swagger
 * /api/guardias/enviar-parqueaderos-disponibles:
 *     post:
 *        summary: Enviar parqueaderos disponibles al usuario
 *        security:
 *          - bearerAuth: []
 *        tags: [Guardia]
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    description: Email del usuario
 *                  placa_vehiculo:
 *                    type: string
 *                    description: Placa del vehículo
 *                example:
 *                  email: "cenai63408@sablecc.com"
 *                  placa_vehiculo: "abc-6"
 *        responses:
 *          200:
 *            description: Parqueaderos disponibles enviados
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    msg:
 *                      type: string
 *                      description: Mensaje de éxito
 *                  example:
 *                    msg: "Parqueaderos disponibles enviados al usuario"
 *          403:
 *              description: No autorizado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Mensaje de error
 *                          example:
 *                              msg: Lo sentimos primero debe proporcionar un token
 */
router.post(
  "/guardias/enviar-parqueaderos-disponibles",
  verificarRol,
  enviarParqueaderosAUsuarios
);

/**
 * @swagger
 * /api/guardias/actualizar-perfil/{id}:
 *  put:
 *      summary: Actualizar perfil del guardia
 *      tags: [Guardia]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: ID del guardia
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nombre:
 *                              type: string
 *                              description: El nombre del guardia
 *                          apellido:
 *                              type: string
 *                              description: El apellido del guardia
 *                          cedula:
 *                              type: string
 *                              description: La cédula del guardia
 *                          telefono:
 *                              type: string
 *                              description: El número de teléfono del guardia
 *                          estado:
 *                              type: boolean
 *                              description: El estado del guardia
 *                      example:
 *                          nombre: "Martin"
 *                          apellido: "Perez"
 *                          cedula: "1548951520"
 *                          telefono: "0991823012"
 *                          estado: true
 *      responses:
 *          200:
 *              description: Perfil actualizado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Mensaje de éxito
 *                          example:
 *                              msg: "Perfil guardia actualizado"
 *          404:
 *              description: Error al actualizar guardia
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Mensaje de error
 *                      examples:
 *                         validación incompleta:
 *                           value:
 *                             msg: Lo sentimos debe llenar todos los campos
 *                         Guardia no existente:
 *                           value:
 *                             msg: Lo sentimos pero ese guardia no se encuentra registrado
 *                         token no valido:
 *                           value:
 *                             msg: Lo sentimos primero debe proporcionar un token
 */
router.put("/guardias/actualizar-perfil/:id", verificarRol, actualizarPerfil);

export default router;
