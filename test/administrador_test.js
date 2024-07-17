import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import administrador from '../src/models/administrador.js';
import guardias from '../src/models/guardias.js';
import parqueaderos from '../src/models/parqueaderos.js';
import usuarios from '../src/models/usuarios.js';
import generarJWT from '../src/helpers/crearJWT.js';
import {
    registroAdmin,
    EliminarUsuarios,
    cambiarEstadoGuardia,
    listarDisponibilidadParqueaderosAdmin,
    ListarUsuarios,
    ListarGuardias,
    registroGuardias
} from '../src/controllers/administrador_controller.js';

describe('administador Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {},
            params: {}
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

    // Pruebas para registroAdmin
    describe('registroAdmin', () => {
        it('should return 400 if fields are empty', async () => {
            req.body = { email: '', password: '',nombre:'',apellido:'',cedula:''};
            await cambiarEstadoGuardia(req, res, next);
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos debe llenar todos los campos' })).to.be.true;
        });
        
        it('should return 400 if email is already registered', async () => {
            req.body = { email: 'test@test.com', password: 'password' };
            sinon.stub(administrador, 'findOne').resolves({});

            await registroAdmin(req, res, next);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos este email, ya se encuentra registrado' })).to.be.true;
        });

        it('should return 200 and register admin if successful', async () => {
            req.body = { email: 'test@test.com', password: 'password' };
            sinon.stub(administrador, 'findOne').resolves(null);
            sinon.stub(administrador.prototype, 'save').resolves();
            sinon.stub(administrador.prototype, 'encrypPassword').resolves('encryptedPassword');

            await registroAdmin(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ msg: 'Administrador registrado' })).to.be.true;
        });
    });

    // Pruebas para EliminarUsuarios
    describe('EliminarUsuarios', () => {
        it('should return 404 if ID is not valid', async () => {
            req.params.id = 'invalidId';
            sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(false);

            await EliminarUsuarios(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'ID de usuario no válido' })).to.be.true;
        });

        it('should return 404 if user is not found', async () => {
            req.params.id = 'testId';
            sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(true);
            sinon.stub(usuarios, 'findByIdAndDelete').resolves(null);

            await EliminarUsuarios(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'Usuario no encontrado' })).to.be.true;
        });

        it('should return 200 and delete user if successful', async () => {
            req.params.id = 'testId';
            sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(true);
            sinon.stub(usuarios, 'findByIdAndDelete').resolves({});

            await EliminarUsuarios(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ msg: 'Usuario eliminado' })).to.be.true;
        });
    });

    // Pruebas para ListarUsuarios
    describe('ListarUsuarios', () => {
        it('should return all users', async () => {
            const users = [{}, {}];
            sinon.stub(usuarios, 'find').resolves(users);

            await ListarUsuarios(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(users)).to.be.true;
        });
    });

    // Pruebas para ListarGuardias
    describe('ListarGuardias', () => {
        it('should return all guards', async () => {
            const guards = [{}, {}];
            sinon.stub(guardias, 'find').resolves(guards);

            await ListarGuardias(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(guards)).to.be.true;
        });
    });

    // Pruebas para cambiarEstadoGuardia
    describe('cambiarEstadoGuardia', () => {
        it('should return 400 if fields are empty', async () => {
            req.body = { email: '', password: '',nombre:'',apellido:'',cedula:''};
            await cambiarEstadoGuardia(req, res, next);
            //expect(res.status.calledWith(400)).to.be.true;
            expect(res.status.calledWith(400)).to.be.true;

            expect(res.json.calledWith({ msg: 'Lo sentimos debe llenar todos los campos' })).to.be.true;
        });

        it('should return 404 if ID is not valid', async () => {
            req.body.id = 'invalidId';
            sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(false);

            await cambiarEstadoGuardia(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos pero el id proporcionado no existe' })).to.be.true;
        });

        it('should return 200 and change guard status if successful', async () => {
            req.body.id = 'testId';
            sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(true);
            sinon.stub(guardias, 'findByIdAndUpdate').resolves({});

            await cambiarEstadoGuardia(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ msg: 'Estado del usuario modificado exitosamente' })).to.be.true;
        });
    });

    // Pruebas para listarDisponibilidadParqueaderosAdmin
    describe('listarDisponibilidadParqueaderosAdmin', () => {
        it('should return 203 if no parking lots are available', async () => {
            sinon.stub(parqueaderos, 'find').resolves(null);

            await listarDisponibilidadParqueaderosAdmin(req, res, next);

            expect(res.status.calledWith(203)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos, por el momento no hay parqueaderos disponibles' })).to.be.true;
        });

        it('should return 200 and available parking lots if successful', async () => {
            const parkingLots = [{}, {}];
            sinon.stub(parqueaderos, 'find').resolves(parkingLots);

            await listarDisponibilidadParqueaderosAdmin(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(parkingLots)).to.be.true;
        });
    });

    // Pruebas para registroGuardias
    describe('registroGuardias', () => {
        it('should return 404 if fields are empty', async () => {
            req.body = { email: '', password: '',nombre:'',apellido:'',cedula:''};
            await registroGuardias(req, res, next);
            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos debe llenar todos los campos' })).to.be.true;
        });

        it('should return 404 if guard is already registered', async () => {
            req.body = { email: 'test@test.com', password: 'password' };
            sinon.stub(guardias, 'findOne').resolves({});

            await registroGuardias(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos pero ese guardia ya se encuentra registrado' })).to.be.true;
        });

        it('should return 200 and register guard if successful', async () => {
            req.body = { email: 'test@test.com', password: 'password' };
            sinon.stub(guardias, 'findOne').resolves(null);
            sinon.stub(guardias.prototype, 'save').resolves();
            sinon.stub(guardias.prototype, 'encrypPassword').resolves('encryptedPassword');

            await registroGuardias(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ msg: 'Guardia registrado' })).to.be.true;
        });
    });
});
