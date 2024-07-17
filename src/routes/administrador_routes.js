import { Router } from "express";
import verificarRol from "../middlewares/autenticacion.js";
import {
  cambiarEstadoGuardia,
  EliminarUsuarios,
  listarDisponibilidadParqueaderosAdmin,
  ListarGuardias,
  ListarUsuarios,
  loginAdmin,
  registroAdmin,
  registroGuardias,
} from "../controllers/administrador_controller.js";
const router = Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *  schemas:
 *      AdminLogin:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *                  description: El email del administrador
 *              password:
 *                  type: string
 *                  format: password
 *                  description: La contraseña debe ser segura
 *                  minLength: 8
 *          example:
 *              email: pedro123@example.com
 *              password: PeDro.123
 *      AdminResponse:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: El nombre del administrador
 *              apellido:
 *                  type: string
 *                  description: El apellido del administrador
 *              telefono:
 *                  type: number
 *                  description: El telefono del administrador
 *              token:
 *                  type: string
 *                  description: El token del administrador
 *              _id:
 *                  type: string
 *                  description: El id del administrador
 *              email:
 *                  type: string
 *                  description: El email del administrador
 *      AdminRegister:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: El nombre del administrador
 *              apellido:
 *                  type: string
 *                  description: El apellido del administrador
 *              cedula:
 *                  type: number
 *                  description: La cédula del administrador
 *              email:
 *                  type: string
 *                  description: El email del administrador
 *              password:
 *                  type: string
 *                  format: password
 *                  description: La contraseña debe ser segura
 *              telefono:
 *                  type: number
 *                  description: El teléfono del administrador
 *          example:
 *              nombre: Pedro
 *              apellido: Pérez
 *              cedula: 12345678
 *              email: pedro123@example.com
 *              password: PeDro.123
 *              telefono: 0987654321
 *      Parqueadero:
 *          type: object
 *          properties:
 *              _id:
 *                type: string
 *                description: El identificador del parqueadero
 *              numero:
 *                type: number
 *                description: El número del parqueadero
 *              bloque:
 *                type: string
 *                description: El bloque del parqueadero
 *              tipo:
 *                type: string
 *                description: El tipo del parqueadero
 *              disponibilidad:
 *                type: boolean
 *                description: Disponibilidad del parqueadero
 *              dimensiones:
 *                type: string
 *                description: Dimensiones del parqueadero
 *              reservado:
 *                type: boolean
 *                description: Estado de reserva del parqueadero
 *              estado:
 *                type: boolean
 *                description: Estado del parqueadero
 *              createdAt:
 *                type: string
 *                format: date-time
 *                description: Fecha de creación del parqueadero
 *              updatedAt:
 *                type: string
 *                format: date-time
 *                description: Fecha de actualización del parqueadero
 *          example:
 *              _id: "6696874101bb1c4e8bc19ac9"
 *              numero: 100
 *              bloque: "6667"
 *              tipo: "normal"
 *              disponibilidad: true
 *              dimensiones: "5x2"
 *              reservado: false
 *              estado: true
 *      Usuario:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: El nombre del usuario
 *              apellido:
 *                  type: string
 *                  description: El apellido del usuario
 *              email:
 *                  type: string
 *                  description: El email del usuario
 *          example:
 *              nombre: Marcelo
 *              apellido: Cabezas
 *              email: macelo321@example.com
 *      Guardia:
 *           type: object
 *           properties:
 *               _id:
 *                 type: string
 *                 description: Identificador único del guardia
 *               nombre:
 *                 type: string
 *                 description: El nombre del guardia
 *               apellido:
 *                 type: string
 *                 description: El apellido del guardia
 *               cedula:
 *                 type: string
 *                 description: Número de cédula del guardia
 *               correo:
 *                 type: string
 *                 description: El correo electrónico del guardia
 *               password:
 *                 type: string
 *                 description: Contraseña del guardia (se recomienda no exponer en la API)
 *               telefono:
 *                 type: string
 *                 nullable: true
 *                 description: Número de teléfono del guardia (opcional)
 *               estado:
 *                 type: boolean
 *                 description: Estado del guardia (activo/inactivo)
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de creación del registro
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora de última actualización del registro
 *               __v:
 *                 type: integer
 *                 description: Versión del documento (usado internamente por MongoDB)
 *           example:
 *               nombre: "Juanito"
 *               apellido: "Perez"
 *               cedula: "1548951520"
 *               correo: "tobema9541@bsidesmn.com"
 *               password: "Juanito.123"
 *               telefono: 0998374102
 *               estado: true
 *      EstadoGuardia:
 *          type: object
 *          properties:
 *              estado:
 *                  type: string
 *                  description: Nuevo estado del guardia
 *          example:
 *              "id": "6696936fd07fabd25fbdfc15"
 */

/**
 * @swagger
 * tags:
 *  name: Administrador
 *  description: Endpoints para administradores
 */

/**
 * @swagger
 * /api/administrador/registrar:
 *  post:
 *      summary: Registro de administrador
 *      tags: [Administrador]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AdminRegister'
 *      responses:
 *          200:
 *              description: Administrador registrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Mensaje de éxito
 *                          example:
 *                              msg: Administrador registrado
 *          400:
 *              description: Error en el registro
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Mensaje de error
 *                      examples:
 *                          Llenar todos los campos:
 *                              value:
 *                                  msg: Lo sentimos debe llenar todos los campos
 *                          Email ya registrado:
 *                              value:
 *                                  msg: Lo sentimos este email, ya se encuentra registrado
 */
router.post("/administrador/registrar", registroAdmin);

/**
 * @swagger
 * /api/administrador/login:
 *  post:
 *      summary: Login de administrador
 *      tags: [Administrador]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: El email del administrador
 *                          password:
 *                              type: string
 *                              format: password
 *                              description: La contraseña debe ser segura
 *                              minLength: 8
 *                      example:
 *                          email: pedro123@example.com
 *                          password: PeDro.123
 *      responses:
 *          200:
 *              description: Login exitoso
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              nombre:
 *                                  type: string
 *                                  description: El nombre del administrador
 *                              apellido:
 *                                  type: string
 *                                  description: El apellido del administrador
 *                              telefono:
 *                                  type: number
 *                                  description: El telefono del administrador
 *                              token:
 *                                  type: string
 *                                  description: El token del administrador
 *                              _id:
 *                                  type: string
 *                                  description: El id del administrador
 *                              email:
 *                                  type: string
 *                                  description: El email del administrador
 *                          example:
 *                              nombre: Pedro
 *                              apellido: Pineda
 *                              telefono: 0998736473
 *                              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTVkMGYzMWE5MjQxYWRlOWNiNjJhOCIsInJvbCI6ImFkbWluaXN0cmFkb3IiLCJpYXQiOjE3MjEwOTQ0MjIsImV4cCI6MTcyMTE4MDgyMn0.lGmyzTbE7xCdTK74_XANAsILSTXcFhD_KTwoaC6-ncQ
 *                              _id: 60f3a9b9a0b9b0b9b0b9b0b9
 *                              email: pedro123@example.com
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
 *                          usuario no registrado:
 *                              value:
 *                                  msg: Lo siento el usuario no se encuentra registrado
 *                          Contraseña incorrecta:
 *                              value:
 *                                  msg: Lo sentimos la contraseña es incorrecta
 *                          No autenticado:
 *                              value:
 *                                  msg: Lo sentimos primero debe proporcionar un token
 */
router.post("/administrador/login", loginAdmin);

/**
 * @swagger
 * /api/administrador/listar-usuarios:
 *  get:
 *      summary: Listar usuarios
 *      tags: [Administrador]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Lista de usuarios
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Usuario'
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
router.get("/administrador/listar-usuarios", verificarRol, ListarUsuarios);

/**
 * @swagger
 * /api/administrador/eliminar_usuario/{id}:
 *  delete:
 *      summary: Eliminar usuario
 *      tags: [Administrador]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: ID del usuario a eliminar
 *      responses:
 *          200:
 *              description: Usuario eliminado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Mensaje de éxito
 *                          example:
 *                              msg: Usuario eliminado
 *          404:
 *              description: Error al eliminar el usuario
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Mensaje de error
 *                      examples:
 *                          ID de usuario no válido:
 *                              value:
 *                                  msg: ID de usuario no válido
 *                          Usuario no encontrado:
 *                              value:
 *                                  msg: Usuario no encontrado 
 */
router.delete(
  "/administrador/eliminar_usuario/:id",
  verificarRol,
  EliminarUsuarios
);

/**
 * @swagger
 * /api/administrador/listar-guardias:
 *  get:
 *      summary: Listar guardias
 *      tags: [Administrador]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Lista de guardias
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Guardia'
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
router.get("/administrador/listar-guardias", verificarRol, ListarGuardias);

/**
 * @swagger
 * /api/administrador/cambiar-estado-guardia/{id}:
 *  patch:
 *      summary: Cambiar estado de un guardia
 *      tags: [Administrador]
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *                type: string
 *            required: true
 *            description: ID del guardia (debe ser un ID válido existente en la base de datos)
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/EstadoGuardia'
 *      responses:
 *          200:
 *              description: Estado del guardia modificado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Mensaje de éxito
 *                          example:
 *                              msg: Estado del guardia modificado exitosamente
 *          404:
 *              description: ID no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Mensaje de error
 *                          example:
 *                              msg: Lo sentimos pero el id proporcionado no existe
 */
router.patch(
  "/administrador/cambiar-estado-guardia/:id",
  verificarRol,
  cambiarEstadoGuardia
);

/**
 * @swagger
 * /api/administrador/disponibilidad-parqueadero:
 *  get:
 *      summary: Disponibilidad de parqueaderos
 *      tags: [Administrador]
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: Disponibilidad de parqueaderos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Parqueadero'
 *          203:
 *              description: Sin disponibilidad de parqueaderos
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Mensaje de error
 *                          example:
 *                              msg: Lo sentimos, por el momento no hay parqueaderos disponibles
 *          404:
 *              description: Error al obtener la disponibilidad
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Mensaje de error
 *                          example:
 *                              msg: Formato del token no válido
 */
router.get(
  "/administrador/disponibilidad-parqueadero",
  verificarRol,
  listarDisponibilidadParqueaderosAdmin
);

/**
 * @swagger
 * /api/administrador/registrar-guardia:
 *  post:
 *      summary: Registro de guardia
 *      required: true
 *      security:
 *          - bearerAuth: []
 *      tags: [Administrador]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Guardia'
 *      responses:
 *          200:
 *              description: Guardia registrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Mensaje de éxito
 *                          example:
 *                              msg: Guardia registrado
 *          404:
 *              description: Error en el registro del guardia
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              msg:
 *                                  type: string
 *                                  description: Mensaje de error
 *                      examples:
 *                          Error de validación:
 *                              value:
 *                                  msg: Lo sentimos debe llenar todos los campos 
 *                          Guardia ya registrado:
 *                              value:
 *                                  msg: Lo sentimos pero ese guardia ya se encuentra registrado
 *                          Formato del token no válido:
 *                              value:
 *                                  msg: Formato del token no válido
 */
router.post("/administrador/registrar-guardia", verificarRol, registroGuardias);


export default router;
