import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import { assert } from "chai";
import { describe } from "mocha";
import { ADA, store } from "../src";

describe('Test Suite', function () {
  this.slow(0);
  const ada = new ADA({
    app_id: 'app_id',
    version: 'v0.5.0',
    public_key: 'public_key',
  })
  it('should signup user and check if store state updated', async () => {
    const mock_axios = new MockAdapter(ada.axios_instance as AxiosInstance)
    mock_axios
      .onPost('providers/basic/signup')
      .reply(200, {
        access_token: 'access_token_for_signup',
        refresh_token: 'refresh_token_for_signup',
      })
    const tokens = await ada.basic.signup({
      email: 'johndoe@example.com',
      password: 'johndoepassword',
      props: {
        name: 'john',
      },
    })
    assert.equal(store.state.tokens.access_token, tokens.access_token)
    assert.equal(store.state.tokens.refresh_token, tokens.refresh_token)
  })
  it('should signin user and check if store state updated', async () => {
    const mock_axios = new MockAdapter(ada.axios_instance as AxiosInstance)
    mock_axios
      .onPost('providers/basic/signin')
      .reply(200, {
        access_token: 'access_token_for_signin',
        refresh_token: 'refresh_token_for_signin',
      })
    const tokens = await ada.basic.signin({
      key: 'johndoe@example.com',
      password: 'johndoepassword',
    })
    assert.equal(store.state.tokens.access_token, tokens.access_token)
    assert.equal(store.state.tokens.refresh_token, tokens.refresh_token)
  })
  it('should fetch user and check if store state updated', async () => {
    const mock_axios = new MockAdapter(ada.axios_instance as AxiosInstance)
    mock_axios
      .onGet('userops/fetch/self')
      .reply(200, {
        user: {
          _id: 'johndoe_id',
          email: 'johndoe@example.com',
          verified: true,
          props: {
            name: 'john'
          },
          provider: 'basic',
          account_status: 'enabled',
          created_at: Date.now(),
          updated_at: Date.now()
        }
      })
    const user = await ada.userops.fetch_self()
    assert.equal(user, store.state.user)
  })
  it('should refresh token and check if state updated', async () => {
    const mock_axios = new MockAdapter(ada.axios_instance as AxiosInstance)
    mock_axios
      .onPost('userops/refresh')
      .reply(200, {
        access_token: 'new_access_token'
      })
    const tokens = await ada.userops.refresh_token()
    assert.equal(store.state.tokens.access_token, tokens.access_token)
    assert.equal(store.state.tokens.refresh_token, tokens.refresh_token)
  })
  it('should resetpassword with email', async () => {
    const mock_axios = new MockAdapter(ada.axios_instance as AxiosInstance)
    mock_axios
      .onPost('userops/resetpass/email/gen')
      .reply(200)
    await ada.userops.reset_password({
      email: 'johndoe@example.com'
    })
  })
  it('should verify token for password reset', async () => {
    const mock_axios = new MockAdapter(ada.axios_instance as AxiosInstance)
    mock_axios
      .onPost('userops/resetpass/email/verify')
      .reply(200)
    await ada.userops.verify_token({
      token: 'pass_reset_token',
      password: 'newjohndoepassword'
    })
  })
  it('should verify if latest version is supported', async () => {
    const latest_version = 'v0.5.0'
    assert.equal(ada.supported_versions[ada.supported_versions.length - 1], latest_version)
  })
})