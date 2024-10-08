import config from '../config';
import { TestingUtils, requestWithSupertest, token } from '../config/testing';
import { DatabaseResolver } from '../database';

describe('POST /admin/login', () => {
    beforeEach(() => DatabaseResolver.reset());

    describe('should authenticate admin successfully', () => {
        it('with correct name and password', async () => {
            const expectedResultValue = {
                success: true,
                message: config.messages.successfullLogin,
                token,
            };
            await TestingUtils.saveAndTestAdmin(TestingUtils.DEFAULT_ADMIN);

            const res = await requestWithSupertest
                .post('/api/v1/admin/login')
                .send({
                    nameOrEmail: TestingUtils.DEFAULT_ADMIN.name,
                    password: TestingUtils.DEFAULT_ADMIN.user.password,
                });
            expect(res.body).toMatchObject(expectedResultValue);
            TestingUtils.testAuthResponseCookies(res);
            expect(res.status).toEqual(200);
        });

        it('with correct email and password', async () => {
            const expectedResultValue = {
                success: true,
                message: config.messages.successfullLogin,
                token,
            };
            await TestingUtils.saveAndTestAdmin(TestingUtils.DEFAULT_ADMIN);

            const res = await requestWithSupertest
                .post('/api/v1/admin/login')
                .send({
                    nameOrEmail: TestingUtils.DEFAULT_ADMIN.user.email,
                    password: TestingUtils.DEFAULT_ADMIN.user.password,
                });
            expect(res.body).toMatchObject(expectedResultValue);
            TestingUtils.testAuthResponseCookies(res);
            expect(res.status).toEqual(200);
        });
    });

    describe('should throw error', () => {
        it('when name or email is not provided', async () => {
            const expectedResultValue = {
                success: false,
                message: config.messages.emptyNameOrEmail,
            };
            const res = await requestWithSupertest.post('/api/v1/admin/login');
            expect(res.body).toMatchObject(expectedResultValue);
            expect(res.status).toEqual(400);
        });

        it('when password is not provided', async () => {
            const expectedResultValue = {
                success: false,
                message: config.messages.emptyPassword,
            };
            const res = await requestWithSupertest
                .post('/api/v1/admin/login')
                .send({
                    nameOrEmail: TestingUtils.DEFAULT_ADMIN.name,
                });
            expect(res.body).toMatchObject(expectedResultValue);
            expect(res.status).toEqual(400);
        });

        it('when admin is not found', async () => {
            const expectedResultValue = {
                success: false,
                message: config.messages.adminNotFoundWithNameOrEmail,
            };
            const res = await requestWithSupertest
                .post('/api/v1/admin/login')
                .send({
                    nameOrEmail: TestingUtils.DEFAULT_ADMIN.name,
                    password: TestingUtils.DEFAULT_ADMIN.user.password,
                });
            expect(res.body).toMatchObject(expectedResultValue);
            expect(res.status).toEqual(404);
        });

        it('when provided password is wrong', async () => {
            const expectedResultValue = {
                success: false,
                message: config.messages.wrongPassword,
            };
            await TestingUtils.saveAndTestAdmin(TestingUtils.DEFAULT_ADMIN);

            const res = await requestWithSupertest
                .post('/api/v1/admin/login')
                .send({
                    nameOrEmail: TestingUtils.DEFAULT_ADMIN.name,
                    password: TestingUtils.ALTERNATIVE_ADMIN.user.password,
                });
            expect(res.body).toMatchObject(expectedResultValue);
            expect(res.status).toEqual(400);
        });

        it('when provided password has less characters than necessary', async () => {
            const expectedResultValue = {
                success: false,
                message: config.messages.insuficientPasswordCharacters,
            };
            const res = await requestWithSupertest
                .post('/api/v1/admin/login')
                .send({
                    nameOrEmail: TestingUtils.DEFAULT_ADMIN.user.email,
                    password: 'r',
                });
            expect(res.body).toMatchObject(expectedResultValue);
            expect(res.status).toEqual(400);
        });
    });
});
