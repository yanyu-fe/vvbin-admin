<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="username" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.username"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>
      <FormItem name="mobile" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.mobile"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
          :sendCodeApi="sendCodeData"
        />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>

      <FormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <Checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </Checkbox>
      </FormItem>

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref, unref } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Button, Checkbox, Form, Input } from 'ant-design-vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { CountdownInput } from '/@/components/CountDown';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { LoginStateEnum, useFormRules, useFormValid, useLoginState } from './useLogin';
  import { isMobile } from '/@/utils/is';
  import { register, sendRegisterCode } from '/@/api/sys/user';
  import { useMessage } from '/@/hooks/web/useMessage';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState, setLoginState } = useLoginState();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    sms: '',
    policy: false,
  });

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);
  const { createMessage } = useMessage();
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

  const sendCodeData = async () => {
    // 获取验证码
    const valid = isMobile(formData.mobile);
    if (valid) {
      // 发送验证码
      try {
        await sendRegisterCode({ mobile: formData.mobile });
        createMessage.success('验证码获取成功');
        return true;
      } catch (e) {
        // createMessage.error('验证码获取失败');
      }
    } else {
      // 验证失败
      createMessage.error('手机号格式不正确');
    }
  };

  async function handleRegister() {
    const data = await validForm();
    if (!data) return;
    // console.log(data);
    loading.value = true;
    try {
      await register(data);
      createMessage.success('注册成功，正在跳转登录页');
      formRef.value.resetFields();
      // 注册成功，返回登录页面
      setLoginState(LoginStateEnum.LOGIN);
    } catch (e) {
      // TODO
    } finally {
      loading.value = false;
    }
  }
</script>
