import { expect } from 'chai';
import sinon from 'sinon';
import Guardias from '../src/models/guardias.js';
import Parqueaderos from '../src/models/parqueaderos.js';
import Usuarios from '../src/models/usuarios.js';
import mongoose from 'mongoose';
import {

    perfil,
    verParqueaderosDisponibles,
    enviarParqueaderosAUsuarios,
    actualizarPerfil
} from '../src/controllers/guardia_controller.js';
import { enviarParqueaderosUsuarios } from '../src/config/nodemailer.js';
import generarJWT from '../src/helpers/crearJWT.js';

// Grupo de pruebas para el controlador de guardias
describe('Guardias Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
            guardia: {}
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

    // Grupo de pruebas para perfil
    describe('perfil', () => {
        it('should return guard profile', async () => {
            req.guardia = { nombre: 'test', apellido: 'test', email: 'test@example.com' };

            await perfil(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(req.guardia)).to.be.true;
        });
    });

    // Grupo de pruebas para verParqueaderosDisponibles
    describe('verParqueaderosDisponibles', () => {
        it('should return available parking lots', async () => {
            const parqueaderos = [{ id: 1, estado: true }];
            sinon.stub(Parqueaderos, 'find').resolves(parqueaderos);

            await verParqueaderosDisponibles(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(parqueaderos)).to.be.true;
        });

        it('should return 203 if no parking lots are available', async () => {
            sinon.stub(Parqueaderos, 'find').resolves({estado: false});
            await verParqueaderosDisponibles(req, res, next);

            expect(res.status.calledWith(203)).to.be.false;
            expect(res.json.calledWith({ msg: 'Lo sentimos, por el momento no hay parqueaderos disponibles' })).to.be.false;
        });
    });

    // Grupo de pruebas para enviarParqueaderosAUsuarios
    describe('enviarParqueaderosAUsuarios', () => {
        beforeEach(() => {
            req.body = { email: 'test@example.com', placa_vehiculo: 'ABC123' };
        });

        it('should return 404 if fields are empty', async () => {
            req.body = { email: '', placa_vehiculo: '' };

            await enviarParqueaderosAUsuarios(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos debe llenar todos los campos' })).to.be.true;
        });

        it('should return 404 if user is not found', async () => {
            sinon.stub(Usuarios, 'findOne').resolves(null);

            await enviarParqueaderosAUsuarios(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos pero el usuario que acaba de ingresar no se encuentra registrado' })).to.be.true;
        });

    });

    // Grupo de pruebas para actualizarPerfil
    describe('actualizarPerfil', () => {
        beforeEach(() => {
            req.body = { nombre: 'newName', apellido: 'newLastName' };
            req.params.id = 'guardiaId';
        });

        it('should return 404 if fields are empty', async () => {
            req.body = { nombre: '', apellido: '' };

            await actualizarPerfil(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos debe llenar todos los campos' })).to.be.true;
        });

        it('should return 404 if guard id is invalid', async () => {
            req.params.id = 'invalidId';
            sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(false);

            await actualizarPerfil(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ msg: 'Lo sentimos pero ese guardia no se encuentra registrado' })).to.be.true;
        });

    });
});