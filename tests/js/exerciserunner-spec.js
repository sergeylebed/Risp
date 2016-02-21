import { createStore } from 'redux';
import { ExerciseRunner } from '..\app\js\ExerciseRunner';
import { assert } from 'assert';
import { should} from 'should';

describe('ExerciseRunner', function() {
  
  describe('ExerciseRunner ctor', function () {
    
    it('should create an object', function () {
      var result = new ExerciseRunner({});
      should.exist(result);
    });
  });
});