import { expect } from 'chai';
import sinon from 'sinon';
import Usuarios from '../src/models/usuarios.js';
import {
    registrarUsuario,
    perfilUsuario,
    recuperarContraseña,
    nuevaContraseña,
    actualizarContraseña,
    actualizarPerfil,
    confirmarEmail,
    comprobarTokenContraseña
} from '../src/controllers/usuario_controller.js';



// Grupo de pruebas para usuarios (CRUD)
describe('Usuarios Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
            usuario: {}
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        next = sinon.stub();
    });

    afterEach(() => {
        sinon.restore();
    });

    // Grupo de pruebas para registrarUsuario
    describe('registrarUsuario', () => {
        beforeEach(() => {
            req.body = { email: 'test@example.com', password: 'password', placa_vehiculo: 'ABC123' };
        });

        it('should register a new user', async () => {
            sinon.stub(Usuarios, 'findOne').resolves(null);
            sinon.stub(Usuarios.prototype, 'save').resolves();
            sinon.stub(Usuarios.prototype, 'encrypPassword').resolves('encryptedPassword');
            sinon.stub(Usuarios.prototype, 'createToken').returns('token');      

            await registrarUsuario(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ msg: 'Revisa tu correo para verificar tu cuenta' })).to.be.true;
        });

        it('should return 400 if fields are empty', async () => {
            req.body = { email: '', password: '', placa_vehiculo: '' };

            await registrarUsuario(req, res, next);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos debe llenar todos los campos' })).to.be.true;
        });

        it('should return 400 if email is already registered', async () => {
            sinon.stub(Usuarios, 'findOne').resolves({ email: 'test@example.com' });

            await registrarUsuario(req, res, next);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos este email, ya se encuentra registrado' })).to.be.true;
        });

        it('should return 400 if vehicle is already registered', async () => {
            sinon.stub(Usuarios, 'findOne').onFirstCall().resolves(null).onSecondCall().resolves({ placa_vehiculo: 'ABC123' });

            await registrarUsuario(req, res, next);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos ese vehiculo, ya se encuentra registrado' })).to.be.true;
        });
    });

    // Grupo de pruebas para confirmarEmail
    describe('confirmarEmail', () => {
        it('should confirm email', async () => {
            const usuario = { token: 'token', confirmEmail: false, save: sinon.stub().resolves() };
            sinon.stub(Usuarios, 'findOne').resolves(usuario);

            req.params.token = 'token';

            await confirmarEmail(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ msg: 'Token confirmado, ya puedes iniciar sesión' })).to.be.true;
        });

        it('should return 400 if token is missing', async () => {
            req.params.token = '';

            await confirmarEmail(req, res, next);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos no hemos podido verificar su cuenta' })).to.be.true;
        });

        it('should return 404 if user is not found', async () => {
            sinon.stub(Usuarios, 'findOne').resolves(null);

            req.params.token = 'token';

            await confirmarEmail(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'La cuenta ya ha sido verificada' })).to.be.true;
        });
    });

    // Grupo de pruebas para perfilUsuario
    describe('perfilUsuario', () => {
        it('should return user profile', async () => {
            req.usuario = { nombre: 'test', apellido: 'test', email: 'test@example.com' };

            await perfilUsuario(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(req.usuario)).to.be.true;
        });
    });

    // Grupo de pruebas para recuperarContraseña
    describe('recuperarContraseña', () => {

        it('should return 404 if fields are empty', async () => {
            req.body.email = '';

            await recuperarContraseña(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos debe llenar todos los campos' })).to.be.true;
        });

        it('should return 404 if user is not found', async () => {
            sinon.stub(Usuarios, 'findOne').resolves(null);

            req.body.email = 'test@example.com';

            await recuperarContraseña(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos pero el email que acabe de ingresar no esta registrado' })).to.be.true;
        });
    });

    // Grupo de pruebas para nuevaContraseña
    describe('nuevaContraseña', () => {
        beforeEach(() => {
            req.body = { password: 'newPassword', confirmarPassword: 'newPassword' };
            req.params.token = 'token';
        });

        it('should update password', async () => {
            const usuario = { token: 'token', save: sinon.stub().resolves(), encrypPassword: sinon.stub().resolves('encryptedPassword') };
            sinon.stub(Usuarios, 'findOne').resolves(usuario);

            await nuevaContraseña(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ msg: 'Contraseña actualizada con exito' })).to.be.true;
        });

        it('should return 404 if fields are empty', async () => {
            req.body = { password: '', confirmarPassword: '' };

            await nuevaContraseña(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos, debe llenar todos los campos' })).to.be.true;
        });

        it('should return 404 if passwords do not match', async () => {
            req.body = { password: 'newPassword', confirmarPassword: 'wrongPassword' };

            await nuevaContraseña(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos, las contraseñas no coinciden' })).to.be.true;
        });

        it('should return 404 if token is invalid', async () => {
            const usuario = { token: 'invalidToken' };
            sinon.stub(Usuarios, 'findOne').resolves(usuario);

            await nuevaContraseña(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos no hemos podido verificar su cuenta' })).to.be.true;
        });

    });

    // Grupo de pruebas para comprobarTokenContraseña
    describe('comprobarTokenContraseña', () => {
        it('should confirm token', async () => {
            const usuario = { token: 'token', save: sinon.stub().resolves() };
            sinon.stub(Usuarios, 'findOne').resolves(usuario);

            req.params.token = 'token';

            await comprobarTokenContraseña(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ msg: 'Token confirmado, ya puedes crear tu nuevo password' })).to.be.true;
        });

        it('should return 400 if token is missing', async () => {
            req.params.token = '';

            await comprobarTokenContraseña(req, res, next);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo siento no se pueda validar la cuenta' })).to.be.true;
        });

        it('should return 400 if token is invalid', async () => {
            const usuario = { token: 'invalidToken' };
            sinon.stub(Usuarios, 'findOne').resolves(usuario);

            req.params.token = 'token';

            await comprobarTokenContraseña(req, res, next);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos no se pueda validar la cuenta' })).to.be.true;
        });
    });

    // Grupo de pruebas para actualizarContraseña
    describe('actualizarContraseña', () => {
        beforeEach(() => {
            req.body = { actualPassword: 'currentPassword', nuevoPassword: 'newPassword' };
            req.usuario._id = 'userId';
        });

        it('should update password', async () => {
            const usuario = { matchPassword: sinon.stub().resolves(true), encrypPassword: sinon.stub().resolves('encryptedPassword'), save: sinon.stub().resolves() };
            sinon.stub(Usuarios, 'findById').resolves(usuario);

            await actualizarContraseña(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ msg: 'Contraseña actualizada con exito' })).to.be.true;
        });

        it('should return 404 if fields are empty', async () => {
            req.body = { actualPassword: '', nuevoPassword: '' };

            await actualizarContraseña(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos debe llenar todos los campos' })).to.be.true;
        });

        it('should return 404 if current password is incorrect', async () => {
            const usuario = { matchPassword: sinon.stub().resolves(false) };
            sinon.stub(Usuarios, 'findById').resolves(usuario);

            await actualizarContraseña(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos, la contraseña actual no es correcta' })).to.be.true;
        });

    });

    // Grupo de pruebas para actualizarPerfil
    describe('actualizarPerfil', () => {
        beforeEach(() => {
            req.body = { nombre: 'newName', apellido: 'newLastName' };
            req.params.id = 'userId';
        });

        it('should update profile', async () => {
            req.params.id = 1
            const usuario = { save: sinon.stub().resolves() };
            sinon.stub(Usuarios, 'findByIdAndUpdate').resolves(usuario);

            await actualizarPerfil(req, res, next);

            //expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ msg: 'Perfil actualizado' })).to.be.true;
        });

        it('should return 400 if id is invalid', async () => {
            req.params.id = 'invalidId';

            await actualizarPerfil(req, res, next);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ msg: 'El id que acaba de ingresar no existe' })).to.be.true;
        });

        it('should return 400 if fields are empty', async () => {
            req.body = { email: '', password: '',nombre:'',apellido:'',cedula:''};

            await actualizarPerfil(req, res, next);
            expect(res.status.calledWith(400)).to.be.true;
        });

    });
});
