import { mainBackground } from '@/app/'
import { css } from '@emotion/react'

export const styles = {
  page: css`
    display: flex;
    flex-direction: column;
  `,

  cover: css`
    color: white;
    background: url(${mainBackground});
    /* width: 100%; */
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  mainText: css`
    text-align: center;
    font-size: 80px;
  `,

  extraText: css`
    font-size: 50px;
  `,

  suggestion: css`
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,

  getStarted: css`
    font-size: 50px;
    `,
    footer: css`
      height: 25vh;
      background-color: antiquewhite;
    `,
}