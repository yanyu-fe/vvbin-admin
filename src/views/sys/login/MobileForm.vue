<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
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

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
          {{ t('sys.login.loginButton') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import { Form, Input, Button } from 'ant-design-vue';
  import { CountdownInput } from '/@/components/CountDown';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { isMobile } from '/@/utils/is';
  import { sendLoginCode } from '/@/api/sys/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';

  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();
  const userStore = useUserStore();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    mobile: '',
    sms: '',
  });

  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.MOBILE);

  const { createMessage, notification } = useMessage();

  const sendCodeData = async () => {
    // 获取验证码
    // console.log('Sss');
    const valid = isMobile(formData.mobile);
    if (valid) {
      // 发送验证码
      try {
        await sendLoginCode({ mobile: formData.mobile });
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

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    // console.log(data);
    loading.value = true;
    try {
      const userInfo = await userStore.loginMobile({
        mobile: data.mobile,
        sms: data.sms,
        mode: 'modal', // 不要默认的错误提示
      });
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
          duration: 3,
        });
      }
    } catch (e) {
      // 登录失败
    } finally {
      loading.value = false;
    }
  }
</script>
