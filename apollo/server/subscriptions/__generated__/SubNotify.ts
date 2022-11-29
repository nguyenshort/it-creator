/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SubNotify
// ====================================================

export interface SubNotify_subNotify {
  __typename: "Notify";
  /**
   * Nội dung tin nhắn
   */
  msg: string;
  /**
   * Thông báo lỗi hay không
   */
  error: boolean;
}

export interface SubNotify {
  /**
   * Nhận thông báo
   */
  subNotify: SubNotify_subNotify;
}
