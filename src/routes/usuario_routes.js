import { Router } from "express";
import {
  actualizarContraseña,
  actualizarPerfil,
  comprobarTokenContraseña,
  confirmarEmail,
  loginUsuario,
  nuevaContraseña,
  perfilUsuario,
  recuperarContraseña,
  registrarUsuario,
} from "../controllers/usuario_controller.js";
import verificarRol from "../middlewares/autenticacion.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - placa_vehiculo
 *         - telefono
 *       properties:
 *         email:
 *           type: string
 *           description: Correo del usuario
 *         password:
 *           type: string
 *           format: password
 *           description: Contraseña del usuario
 *         placa_vehiculo:
 *           type: string
 *           description: Placa del vehículo
 *         telefono:
 *           type: number
 *           description: Telémfono del usuario
 *       example:
 *         email: juan.perez@example.com
 *         password: contraseña123
 *         placa_vehiculo: abc-6
 *         telefono: 0987654321
 *
 *     LoginCredentials:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *       example:
 *         email: juan.perez@example.com
 *         password: contraseña123
 *
 *     Parqueadero:
 *       type: object
 *       required:
 *         - numero
 *         - bloque
 *         - tipo
 *       properties:
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
 *       example:
 *         numero: 101
 *         bloque: A
 *         tipo: Automóvil
 *         disponibilidad: true
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
 *   - name: Usuarios
 *     description: Endpoints para usuarios
 */

/**
 * @swagger
 * /api/usuarios/registrar:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Confirmación de correo exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Revisa tu correo para verificar tu cuenta
 *       400:
 *         description: Error en el registro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             examples:
 *               usuarioExistente:
 *                 value:
 *                   msg: Lo sentimos este email, ya se encuentra registrado
 *               validacionIncompleta:
 *                 value:
 *                   msg: Lo sentimos debe llenar todos los campos
 *               vehiculoRegistrado:
 *                 value:
 *                   msg: Lo sentimos ese vehiculo, ya se encuentra registrado
 */
router.post("/usuarios/registrar", registrarUsuario);

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *             application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                       nombre:
 *                           type: string
 *                           description: Nombre del usuario
 *                       apellido:
 *                           type: string
 *                           description: Apellido del usuario
 *                       telefono:
 *                           type: string
 *                           description: Teléfono del usuario
 *                       token:
 *                           type: string
 *                           description: Token de autorización
 *                       id:
 *                           type: string
 *                           description: ID del usuario
 *                       email:
 *                           type: string
 *                           description: Correo del usuario
 *                   example:
 *                        nombre: Juan
 *                        apellido: Perez
 *                        token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZjM0MjUyZmZkZDZiNzQzYzY1NjMwZCIsImlhdCI6MTY1MjQxNzU0MiwiZXhwIjoxNjUyNDIzNjQyfQ.6fP5Jqf9R8H5JpZ7E2p6zY7fK5f6mQeL
 *                        id: 60f3a9b9a0b9b0b9b0b9b0b9
 *                        email: juan.perez@example.com
 *       400:
 *         description: Validación incompleta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Lo sentimos debe llenar todos los campos
 *       404:
 *         description: Error al iniciar sesión
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             examples:
 *               usuario no registrado:
 *                 value:
 *                   msg: Lo siento el usuario no se encuentra registrado
 *               Contraseña incorrecta:
 *                 value:
 *                   msg: Lo sentimos la contraseña es incorrecta
 */
router.post("/usuarios/login", loginUsuario);

/**
 * @swagger
 * /api/usuarios/confirmar-email/{token}:
 *   get:
 *     summary: Confirmar email del usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de confirmación de email
 *     responses:
 *       200:
 *         description: Email confirmado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Token confirmado, ya puedes iniciar sesión
 *       400:
 *         description: Problema al verificar su cuenta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Lo sentimos no hemos podido verificar su cuenta
 *       404:
 *         description: Cuenta previamente verificada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: La cuenta ya ha sido verificada
 */
router.get("/usuarios/confirmar-email/:token", confirmarEmail);

/**
 * @swagger
 * /api/usuarios/recuperar-password:
 *   post:
 *     summary: Solicitar recuperación de contraseña
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Correo de recuperación enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Revise su correo electrónico para reestablecer su contraseña
 *       404:
 *         description: Error al recuperar contraseña
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example:  |
 *             examples:
 *               Email no registrado:
 *                 value:
 *                   msg: Lo sentimos pero el email que acabe de ingresar no esta registrado
 *               validación incompleta:
 *                 value:
 *                   msg: Lo sentimos debe llenar todos los campos
 */
router.post("/usuarios/recuperar-password", recuperarContraseña);

/**
 * @swagger
 * /api/usuarios/recuperar-password/{token}:
 *   get:
 *     summary: Comprobar token de recuperación de contraseña
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de recuperación de contraseña
 *     responses:
 *       200:
 *         description: Token de recuperación correcto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Contraseña actualizada con exito
 *       404:
 *         description: Error al recuperar contraseña
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             examples:
 *               id inexistente:
 *                 value:
 *                   msg: Lo sentimos, no existe el usuario "id"
 *               contraseñasNoCoinciden:
 *                 value:
 *                   msg: Lo sentimos, la contraseña actual no es correcta
 */
router.get("/usuarios/recuperar-password/:token", comprobarTokenContraseña);

/**
 * @swagger
 * /api/usuarios/nueva-password/{token}:
 *   post:
 *     summary: Establecer nueva contraseña
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de recuperación de contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - confirmarPassword
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Nueva contraseña
 *               confirmarPassword:
 *                 type: string
 *                 format: password
 *                 description: Confirmación de la nueva contraseña
 *           example:
 *             password: "NuevaContraseña123"
 *             confirmarPassword: "NuevaContraseña123"
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Contraseña actualizada con éxito
 *       404:
 *         description: Error en la actualización de la contraseña
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             examples:
 *               camposVacios:
 *                 value:
 *                   msg: Lo sentimos, debe llenar todos los campos
 *               contraseñasNoCoinciden:
 *                 value:
 *                   msg: Lo sentimos, las contraseñas no coinciden
 *               tokenInvalido:
 *                 value:
 *                   msg: Lo sentimos no hemos podido verificar su cuenta
 */
router.post("/usuarios/nueva-password/:token", nuevaContraseña);

/**
 * @swagger
 * /api/usuarios/perfil:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Identificador único del usuario
 *                 nombre:
 *                   type: string
 *                   description: Nombre del usuario
 *                 apellido:
 *                   type: string
 *                   description: Apellido del usuario
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Correo electrónico del usuario
 *                 estado:
 *                   type: boolean
 *                   description: Estado del usuario (activo/inactivo)
 *                 telefono:
 *                   type: integer
 *                   description: Número de teléfono del usuario
 *                 placa_vehiculo:
 *                   type: string
 *                   description: Placa del vehículo del usuario
 *             example:
 *               _id: "669708feac1aad8eeaa75a8b"
 *               nombre: "Marcelo"
 *               apellido: "Cabezas"
 *               email: "cenar63408@sablecc.com"
 *               estado: true
 *               telefono: 987654321
 *               placa_vehiculo: "abc-6"
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Lo sentimos primero debe proporcionar un token
 */
router.get("/usuarios/perfil", verificarRol, perfilUsuario);

/**
 * @swagger
 * /api/usuarios/actualizar-password:
 *   put:
 *     summary: Actualizar contraseña del usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - actualPassword
 *               - nuevoPassword
 *             properties:
 *               actualPassword:
 *                 type: string
 *                 format: password
 *                 description: Contraseña actual del usuario
 *               nuevoPassword:
 *                 type: string
 *                 format: password
 *                 description: Nueva contraseña del usuario
 *           example:
 *             actualPassword: "ContraseñaActual123"
 *             nuevoPassword: "NuevaContraseña456"
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Contraseña actualizada con éxito
 *       404:
 *         description: Error en la actualización de la contraseña
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             examples:
 *               id inexistente:
 *                 value:
 *                   msg: Lo sentimos, no existe el usuario
 *               contraseñasNoCoinciden:
 *                 value:
 *                   msg: Lo sentimos, la contraseña actual no es correcta
 *               validación incompleta:
 *                 value:
 *                   msg: Lo sentimos debe llenar todos los campos
 *               No autorizado:
 *                 value:
 *                   msg: Lo sentimos primero debe proporcionar un token
 */
router.put("/usuarios/actualizar-password", verificarRol, actualizarContraseña);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar perfil del usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Perfil actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Datos de actualización inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             examples:
 *               id inexistente:
 *                 value:
 *                   msg: El id que acaba de ingresar no existe
 *               validación incompleta:
 *                 value:
 *                   msg: Lo sentimos, debes llenar todos los campos
 *               No autorizado:
 *                 value:
 *                   msg: Lo sentimos primero debe proporcionar un token
 */
router.put("/usuarios/:id", verificarRol, actualizarPerfil);

export default router;
