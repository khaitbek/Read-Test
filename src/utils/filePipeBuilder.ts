import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export const FilePipeBuilder = new ParseFilePipeBuilder()
  .addFileTypeValidator({ fileType: /(jpg|jpeg|png|)$/ })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
