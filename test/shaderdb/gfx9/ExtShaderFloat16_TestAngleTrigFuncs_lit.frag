#version 450 core

#extension GL_AMD_gpu_shader_half_float: enable

layout(binding = 0) buffer Buffers
{
    vec3 fv3;
};

layout(location = 0) out vec3 fragColor;

void main()
{
    f16vec3 f16v3_1 = f16vec3(fv3);
    f16vec3 f16v3_2 = f16vec3(fv3);

    f16v3_1 = radians(f16v3_1);
    f16v3_1 = degrees(f16v3_1);
    f16v3_1 = sin(f16v3_1);
    f16v3_1 = cos(f16v3_1);
    f16v3_1 = tan(f16v3_1);
    f16v3_1 = asin(f16v3_1);
    f16v3_1 = acos(f16v3_1);
    f16v3_1 = atan(f16v3_1, f16v3_2);
    f16v3_1 = atan(f16v3_1);
    f16v3_1 = sinh(f16v3_1);
    f16v3_1 = cosh(f16v3_1);
    f16v3_1 = tanh(f16v3_1);
    f16v3_1 = asinh(f16v3_1);
    f16v3_1 = acosh(f16v3_1);
    f16v3_1 = atanh(f16v3_1);

    fragColor = f16v3_1;
}
// BEGIN_SHADERTEST
/*
; RUN: amdllpc -spvgen-dir=%spvgendir% -v %gfxip %s | FileCheck -check-prefix=SHADERTEST %s
; SHADERTEST-LABEL: {{^// LLPC}} SPIRV-to-LLVM translation results
; SHADERTEST: = fmul <3 x half> %{{.*}}, <half 0xH2478, half 0xH2478, half 0xH2478>
; SHADERTEST: = fmul <3 x half> %{{.*}}, <half 0xH5329, half 0xH5329, half 0xH5329>
; SHADERTEST: = call <3 x half> @llvm.sin.v3f16(
; SHADERTEST: = call <3 x half> @llvm.cos.v3f16(
; SHADERTEST: = call <3 x half> (...) @llpc.call.tan.v3f16(<3 x half>
; SHADERTEST: = call <3 x half> (...) @llpc.call.asin.v3f16(<3 x half>
; SHADERTEST: = call <3 x half> (...) @llpc.call.acos.v3f16(<3 x half>
; SHADERTEST: = call <3 x half> (...) @llpc.call.atan2.v3f16(<3 x half>
; SHADERTEST: = call <3 x half> (...) @llpc.call.sinh.v3f16(<3 x half>
; SHADERTEST: = call <3 x half> (...) @llpc.call.cosh.v3f16(<3 x half>
; SHADERTEST: = call <3 x half> (...) @llpc.call.tanh.v3f16(<3 x half>
; SHADERTEST: = call <3 x half> (...) @llpc.call.asinh.v3f16(<3 x half>
; SHADERTEST: = call <3 x half> (...) @llpc.call.acosh.v3f16(<3 x half>
; SHADERTEST: = call <3 x half> (...) @llpc.call.atanh.v3f16(<3 x half>
; SHADERTEST-LABEL: {{^// LLPC}} pipeline patching results
; SHADERTEST-COUNT-3: call half @llvm.sin.f16(half
; SHADERTEST-COUNT-3: call half @llvm.cos.f16(half
; SHADERTEST: AMDLLPC SUCCESS
*/
// END_SHADERTEST
