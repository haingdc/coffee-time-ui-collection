import webpack from 'webpack';
import config from './webpack.config.ts';

webpack(config, (err, stats) => {
  if (err || stats?.hasErrors()) {
    console.error(err || stats?.toJson().errors);
  } else {
    console.log(stats?.toString({
      chunks: false,
      colors: true,
    }));
  }
});