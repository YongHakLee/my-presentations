# 2025-09-17 Lab Meeting

- Topic: Camera Matrix

## Introduction

**카메라 행렬(Camera Matrix)**은 월드 공간(World Space, World Coordinate System)의
한 점이 어떻게 이미지에 매핑되는지를 알려준다. 카메라 행렬은 Intrinsic Matrix와 Extrinsic Matrix로 나뉜다.

### Intrinsic Matrix: 카메라의 내부 파라미터를 포함하는 행렬

$$
K = \begin{bmatrix}
f_x & 0 & c_x \\
0 & f_y & c_y \\
0 & 0 & 1
\end{bmatrix}
$$

### Extrinsic Matrix: 카메라의 외부 파라미터를 포함하는 행렬

$$
R = \begin{bmatrix}
r_{11} & r_{12} & r_{13} \\
r_{21} & r_{22} & r_{23} \\
r_{31} & r_{32} & r_{33}
\end{bmatrix}
$$

$$
T = \begin{bmatrix}
t_x \\
t_y \\
t_z
\end{bmatrix}
$$

## 핀홀 카메라(Pinhole Camera)

우리는 실제 카메라의 행렬을 찾고 싶지만, 그런 카메라들은
렌즈를 통과하는 빛의 양을 조절하는 구멍인 조리개가 크고 렌즈가 많아서 분석하기가 매우 복잡하다.
그래서 실제 카메라를 모델링하는 대신, 우리는 핀홀 카메라라는 단순화된 모델을 사용한다.
이상적인 핀홀 카메라는 무한히 작은 조리개를 가지고 있으며, 이는 단지 하나의 점으로 표현된다.
그 결과, 이미지 평면, 즉 센서의 각 점에는 단 하나의 방향에서 오는 빛만이 도달하게 된다.

![핀홀 카메라](./imgs/pinhole_camera.png)

만약 조리개가 더 크다면, 여러 방향에서 온 빛이 센서의 한 점에 도달하게 될 것이고,
그것은 이미지를 흐리게 만들 것이다. 실제 카메라들은 더 큰 조리개를 가지고 있으며,
이러한 흐림 현상을 방지하거나 줄이기 위해 렌즈를 사용한다.
하지만 렌즈는 **방사 왜곡(radial distortion)**이나 **접선 왜곡(tangential distortion)**과 같은 오차를 발생시키며,
이러한 오차들은 핀홀 모델로는 포착되지 않는다.

- **방사 왜곡**: 렌즈의 중심에서 멀어질수록 이미지가 볼록하게 튀어나오거나 오목하게 들어가는 현상
- **접선 왜곡**: 렌즈와 이미지 센서가 완벽하게 평행하지 않아서 이미지가 한쪽으로 기울어지거나 늘어나 보이는 현상

오차들은 좋은 카메라와 렌즈를 사용한다면 보통 무시할 수 있을 정도로 매우 작다.
따라서 핀홀 모델은 간단하고 상당히 정확하기 때문에 매우 유용한 모델이다.

## 월드 좌표계와 카메라 좌표계(World and Camera Coordinate System)

