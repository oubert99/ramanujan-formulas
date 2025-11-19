/**
 * Parser for mathematical approximation data
 * Edit this file on the fly without restarting the server
 */

/**
 * Parse a single approximation object and extract required fields
 * @param {Object} approx - The approximation object
 * @param {number} index - The index in the batch
 * @returns {Object} Parsed data with {expression, targetValue, targetName, description, error}
 */
function parseApproximation(approx, index) {
  console.log('\n' + '='.repeat(80));
  console.log(`📋 PARSING APPROXIMATION #${index}`);
  console.log('='.repeat(80));
  console.log('Raw object keys:', Object.keys(approx));
  console.log('Raw object sample:', JSON.stringify(approx, null, 2).substring(0, 500));
  
  // Extract expression - support multiple field names
  const expression = approx.expression || approx.expr || approx.formula;
  console.log('✓ Expression found:', expression ? `"${expression.substring(0, 50)}..."` : '❌ MISSING');
  
  // Extract target value - support multiple field names
  // Check: value, target, computed, result
  const targetValue = approx.value || approx.target || approx.computed || approx.result;
  console.log('✓ Target value found:', targetValue ? `"${targetValue.toString().substring(0, 50)}..."` : '❌ MISSING');
  
  // Extract metadata
  const targetName = approx.targetName || approx.target_name || approx.name || 'unknown';
  const description = approx.description || approx.desc || '';
  
  console.log('✓ Target name:', targetName);
  console.log('✓ Description:', description || '(none)');
  
  // Validation
  if (!expression) {
    console.log('❌ ERROR: Expression not found!');
    console.log('   Tried fields: expression, expr, formula');
    console.log('   Available fields:', Object.keys(approx).join(', '));
    return {
      error: 'Missing expression field (tried: expression, expr, formula)',
      index
    };
  }
  
  if (!targetValue) {
    console.log('❌ ERROR: Target value not found!');
    console.log('   Tried fields: value, target, computed, result');
    console.log('   Available fields:', Object.keys(approx).join(', '));
    console.log('   Field values:');
    Object.keys(approx).forEach(key => {
      const val = approx[key];
      const preview = typeof val === 'string' ? val.substring(0, 100) : JSON.stringify(val).substring(0, 100);
      console.log(`     - ${key}: ${preview}...`);
    });
    return {
      error: 'Missing target value field (tried: value, target, computed, result)',
      index
    };
  }
  
  console.log('✅ Parsing successful!');
  console.log('='.repeat(80) + '\n');
  
  return {
    expression: expression.toString(),
    targetValue: targetValue.toString(),
    targetName: targetName.toString(),
    description: description.toString(),
    error: null
  };
}

/**
 * Parse a batch of approximations
 * @param {Array} approximations - Array of approximation objects
 * @returns {Object} {parsed: Array, errors: Array}
 */
function parseBatch(approximations) {
  const parsed = [];
  const errors = [];
  
  if (!Array.isArray(approximations)) {
    return {
      parsed: [],
      errors: [{
        index: -1,
        error: 'Input must be an array'
      }]
    };
  }
  
  approximations.forEach((approx, index) => {
    const result = parseApproximation(approx, index);
    
    if (result.error) {
      errors.push({
        index,
        expression: approx.expression || 'missing',
        error: result.error
      });
    } else {
      parsed.push({
        index,
        ...result
      });
    }
  });
  
  return { parsed, errors };
}

module.exports = {
  parseApproximation,
  parseBatch
};

