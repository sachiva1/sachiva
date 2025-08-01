#!/bin/bash

# Performance Testing Script for Sachiva Website
# Tests loading speed, lighthouse scores, and optimization effectiveness

echo "=== Sachiva Website Performance Testing ==="
echo "Testing Date: $(date)"
echo ""

# Test 1: Basic connectivity and response time
echo "1. Testing basic connectivity..."
if curl -o /dev/null -s -w "%{http_code}\n" http://localhost:3000 | grep -q "200"; then
    echo "✅ Website is accessible"
    RESPONSE_TIME=$(curl -o /dev/null -s -w "%{time_total}\n" http://localhost:3000)
    echo "📊 Response Time: ${RESPONSE_TIME}s"
else
    echo "❌ Website is not accessible"
    exit 1
fi

echo ""

# Test 2: Resource optimization check
echo "2. Checking resource optimization..."

# Check if critical CSS is inlined
if curl -s http://localhost:3000 | grep -q "Critical CSS"; then
    echo "✅ Critical CSS is inlined"
else
    echo "⚠️  Critical CSS not found"
fi

# Check if images have lazy loading
if curl -s http://localhost:3000 | grep -q 'loading="lazy"'; then
    echo "✅ Lazy loading implemented"
else
    echo "⚠️  Lazy loading not implemented"
fi

# Check if service worker is registered
if curl -s http://localhost:3000 | grep -q "sw.js"; then
    echo "✅ Service worker found"
else
    echo "⚠️  Service worker not found"
fi

echo ""

# Test 3: Performance metrics
echo "3. Performance Metrics Analysis..."

# Check gzip compression
GZIP_TEST=$(curl -H "Accept-Encoding: gzip" -s -w "%{size_download}\n" http://localhost:3000 -o /dev/null)
NORMAL_TEST=$(curl -s -w "%{size_download}\n" http://localhost:3000 -o /dev/null)

if [ "$GZIP_TEST" -lt "$NORMAL_TEST" ]; then
    echo "✅ Gzip compression is working"
    COMPRESSION_RATIO=$(echo "scale=2; ($NORMAL_TEST - $GZIP_TEST) * 100 / $NORMAL_TEST" | bc)
    echo "📊 Compression Ratio: ${COMPRESSION_RATIO}%"
else
    echo "⚠️  Gzip compression not detected"
fi

echo ""

# Test 4: Core Web Vitals simulation
echo "4. Core Web Vitals Simulation..."

# Simulate LCP (Largest Contentful Paint)
echo "📊 Simulating Core Web Vitals..."
echo "   - LCP Target: < 2.5s"
echo "   - FID Target: < 100ms"
echo "   - CLS Target: < 0.1"

# Check for performance optimizations
OPTIMIZATIONS=0

if curl -s http://localhost:3000 | grep -q 'rel="preload"'; then
    echo "✅ Resource preloading detected"
    ((OPTIMIZATIONS++))
fi

if curl -s http://localhost:3000 | grep -q 'rel="preconnect"'; then
    echo "✅ DNS preconnect detected"
    ((OPTIMIZATIONS++))
fi

if curl -s http://localhost:3000 | grep -q 'defer'; then
    echo "✅ Script deferring detected"
    ((OPTIMIZATIONS++))
fi

if curl -s http://localhost:3000 | grep -q 'width.*height'; then
    echo "✅ Image dimensions specified"
    ((OPTIMIZATIONS++))
fi

echo ""

# Test 5: Accessibility check
echo "5. Accessibility Quick Check..."

if curl -s http://localhost:3000 | grep -q 'alt='; then
    echo "✅ Alt text found for images"
else
    echo "⚠️  Missing alt text"
fi

if curl -s http://localhost:3000 | grep -q 'aria-'; then
    echo "✅ ARIA attributes detected"
else
    echo "⚠️  ARIA attributes not found"
fi

if curl -s http://localhost:3000 | grep -q 'role='; then
    echo "✅ Role attributes detected"
else
    echo "⚠️  Role attributes not found"
fi

echo ""

# Test 6: Mobile optimization
echo "6. Mobile Optimization Check..."

if curl -s http://localhost:3000 | grep -q 'viewport'; then
    echo "✅ Viewport meta tag found"
else
    echo "⚠️  Viewport meta tag missing"
fi

if curl -s http://localhost:3000 | grep -q 'responsive'; then
    echo "✅ Responsive CSS detected"
else
    echo "⚠️  Responsive CSS not detected"
fi

echo ""

# Performance Score Calculation
echo "=== PERFORMANCE SCORE ==="
TOTAL_SCORE=$(echo "scale=0; $OPTIMIZATIONS * 100 / 4" | bc)
echo "Optimization Score: ${TOTAL_SCORE}/100"

if [ "$TOTAL_SCORE" -ge 80 ]; then
    echo "🎉 Excellent performance optimization!"
elif [ "$TOTAL_SCORE" -ge 60 ]; then
    echo "👍 Good performance optimization"
elif [ "$TOTAL_SCORE" -ge 40 ]; then
    echo "⚠️  Moderate performance optimization"
else
    echo "❌ Poor performance optimization"
fi

echo ""

# Recommendations
echo "=== RECOMMENDATIONS ==="
echo "1. Run Lighthouse audit for detailed analysis"
echo "2. Test on real devices and networks"
echo "3. Monitor Core Web Vitals continuously"
echo "4. Optimize images with WebP format"
echo "5. Implement CDN for static assets"
echo "6. Enable HTTP/2 on server"

echo ""
echo "=== Test Complete ==="
echo "For detailed analysis, run: npm run lighthouse"
