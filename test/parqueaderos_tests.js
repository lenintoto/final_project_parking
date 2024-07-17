import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import Parqueaderos from '../src/models/parqueaderos.js';
import {
    registrarParqueadero,
    listarParqueaderos,
    detalleParqueadero,
    listarDisponibilidadParqueaderos,
    actualizarParqueadero,
    cambiarEstadoParqueadero
} from '../src/controllers/parquedero_controller.js';

describe('Parqueaderos Controller', () => {
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

    // Grupo de pruebas para registrar parqueaderos
    describe('registrarParqueadero', () => {
        beforeEach(() => {
            req.body = { numero: 'P1', bloque: 'A' };
        });

        it('debería registrar un nuevo parqueadero', async () => {
            sinon.stub(Parqueaderos, 'findOne').resolves(null);
            sinon.stub(Parqueaderos.prototype, 'save').resolves();

            await registrarParqueadero(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ msg: "Parqueadero registrado con exito" })).to.be.true;
        });

        it('debería manejar campos vacíos', async () => {
            req.body = { numero: '', bloque: '' };

            await registrarParqueadero(req, res, next);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ msg: "Lo sentimos, debe llenar todos los campos" })).to.be.true;
        });

        it('debería manejar parqueadero ya registrado', async () => {
            sinon.stub(Parqueaderos, 'findOne').resolves({});

            await registrarParqueadero(req, res, next);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ msg: "Lo sentimos, este parqueadero ya esta registrado" })).to.be.true;
        });
    });

    // Grupo de pruebas para listar parqueaderos
    describe('listarParqueaderos', () => {
        it('debería listar todos los parqueaderos activos', async () => {
            const parqueaderos = [{}];
            sinon.stub(Parqueaderos, 'find').resolves(parqueaderos);

            await listarParqueaderos(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(parqueaderos)).to.be.true;
        });
    });

    // Grupo de pruebas para detalle de parqueadero
    describe('detalleParqueadero', () => {
        it('debería obtener un parqueadero por id', async () => {
            req.params.id = '5';
            const parqueadero = {numero: "34", bloque: "a4"};
            sinon.stub(Parqueaderos, 'findById').resolves(4);

            await detalleParqueadero(req, res, next);
            expect(res.status.calledWith(200)).to.be.false;
            expect(res.json.calledWith(parqueadero)).to.be.false;
        });

        it('debería manejar id inválido', async () => {
            req.params.id = 'invalidId';

            await detalleParqueadero(req, res, next);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ msg: "El id que acaba de ingresar no existe" })).to.be.true;
        });
    });

    // Grupo de pruebas para listar disponibilidad de parqueaderos
    describe('listarDisponibilidadParqueaderos', () => {
        it('debería listar parqueaderos disponibles', async () => {
            const parqueaderosDisponibles = [{}];
            sinon.stub(Parqueaderos, 'find').resolves(parqueaderosDisponibles);

            await listarDisponibilidadParqueaderos(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(parqueaderosDisponibles)).to.be.true;
        });

    });

    // Grupo de pruebas para actualizar parqueadero
    describe('actualizarParqueadero', () => {
        beforeEach(() => {
            req.params.id = 'testId';
            req.body = { numero: 'P1', bloque: 'B' };
        });

        it('debería actualizar un parqueadero', async () => {
            sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(true);
            sinon.stub(Parqueaderos, 'findByIdAndUpdate').resolves({ save: sinon.stub().resolves() });

            await actualizarParqueadero(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ msg: "Parqueadero actualizado con exito" })).to.be.true;
        });

        it('debería manejar id inválido', async () => {
            req.params.id = 'invalidId';

            await actualizarParqueadero(req, res, next);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ msg: "El id que acaba de ingresar no existe" })).to.be.true;
        });

        it('debería manejar campos vacíos', async () => {
            req.body = { numero: '', bloque: '' };

            await actualizarParqueadero(req, res, next);

            expect(res.status.calledWith(400)).to.be.true;
        });
    });

    // Grupo de pruebas para cambiar estado de parqueadero
    describe('cambiarEstadoParqueadero', () => {
        beforeEach(() => {
            req.params.id = 'testId';
            req.body = { estado: true };
        });

        it('debería cambiar el estado de un parqueadero', async () => {
            sinon.stub(mongoose.Types.ObjectId, 'isValid').returns(true);
            sinon.stub(Parqueaderos, 'findByIdAndUpdate').resolves({ save: sinon.stub().resolves() });

            await cambiarEstadoParqueadero(req, res, next);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith({ msg: "El estado del parqueadero ha sido actualizado con exito" })).to.be.true;
        });

        it('debería manejar id inválido', async () => {
            req.params.id = 'invalidId';

            await cambiarEstadoParqueadero(req, res, next);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ msg: "El id que acaba de ingresar no existe" })).to.be.true;
        });

        it('debería manejar campos vacíos', async () => {
            req.body.estado =''

            await cambiarEstadoParqueadero(req, res, next);

            expect(res.status.calledWith(400)).to.be.true;
        });
    });
});
